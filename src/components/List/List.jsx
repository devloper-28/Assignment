import React, { useEffect, useState } from "react";
import "./List.css";
import Loader from "./Loader";

const List = () => {
  const [repositories, setRepositories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataEnd, setIsDataEnd] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [timePeriod, setTimePeriod] = useState("1-week");
  const [commitActivity, setCommitActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = "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"; // Replace with your personal access token

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading data
      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=created:>${getDateRange()}&sort=stars&order=desc&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        if (currentPage === 1) {
          setRepositories(data.items);
        } else {
          setRepositories((prevRepositories) => [...prevRepositories, ...data.items]);
        }
        setIsDataEnd(data.items.length === 0);
      } catch (error) {
        console.error("Error occurred:", error);
      }
      setIsLoading(false); // Finish loading data
    };

    fetchData();
  }, [currentPage, timePeriod]);

  useEffect(() => {
    const fetchCommitActivity = async (repo) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${repo.full_name}/stats/participation`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const data = await response.json();
        setCommitActivity(data.all);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    if (activeAccordion !== null) {
      const repo = repositories[activeAccordion];
      fetchCommitActivity(repo);
    }
  }, [activeAccordion, repositories]);

  const handleAccordionToggle = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  const getDateRange = () => {
    const currentDate = new Date();
    const startDate = new Date();

    if (timePeriod === "1-week") {
      startDate.setDate(currentDate.getDate() - 7);
    } else if (timePeriod === "2-weeks") {
      startDate.setDate(currentDate.getDate() - 14);
    } else if (timePeriod === "1-month") {
      startDate.setMonth(currentDate.getMonth() - 1);
    }

    return startDate.toISOString().split("T")[0];
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
    setCurrentPage(1); // Reset the page when the time period changes
    setRepositories([]); // Reset the repositories when the time period changes
  };

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !isLoading &&
      !isDataEnd
    ) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="container">
        {/* Time period selector */}
        <div className="time-period-selector">
          <label htmlFor="time-period">Time Period:</label>
          <select id="time-period" value={timePeriod} onChange={handleTimePeriodChange}>
            <option value="1-week">1 Week</option>
            <option value="2-weeks">2 Weeks</option>
            <option value="1-month">1 Month</option>
          </select>
        </div>

        {/* Display the list of repositories */}
        {repositories.map((repo, index) => (
          <div
            className={`accordion-header ${
              index === activeAccordion ? "active repos_box" : "repos_box"
            }`}
            onClick={() => handleAccordionToggle(index)}
            key={repo.id}
          >
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-sm-3">
                    <img src={repo.owner.avatar_url} className="avatar" alt="Owner Avatar" />
                  </div>
                  <div className="col-sm-9">
                    <div className="">
                      <p>
                        <h3 className="responsive_content">
                          <div className="details_list">
                            <p className="titles"> Repository Name:</p> 
                            <p className="desc"> {repo.name} </p>
                          </div>
                          <div className="details_list">
                            <p className="titles">Description:</p>
                            <p className="desc"> {repo.description}</p>
                          </div>
                          <div className="details_list">
                            <p className="titles">Stars:</p>
                            <p className="desc"> {repo.stargazers_count}</p>
                          </div>
                          <div className="details_list">
                            <p className="titles">Issues:</p>
                            <p className="desc"> {repo.open_issues_count}</p>
                          </div>
                          <span className="arrow">{index === activeAccordion ? "▲" : "▼"}</span>
                        </h3>
                        {index === activeAccordion && commitActivity && (
  <div className="accordion-content ">
    <p className="titles">Commit Activity:</p>
    <div className="commits">
      {commitActivity.map((commits, index) => (
        <div className="commit_list" key={index}>
          Week {index + 1}: {commits}
        </div>
      ))}
    </div>
  </div>
)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && <Loader />}
        {isDataEnd && <div>Data End</div>}
      </div>
    </>
  );
};

export default List;
