// List.js

import React, { useEffect, useState } from "react";
import Accordion from "./Accordion";
import TimePeriodSelector from "./TimePeriodSelector";
import "./List.css";

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
      setIsLoading(true);

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
        setRepositories((prevRepositories) => [...prevRepositories, ...data.items]);
        setIsDataEnd(data.items.length === 0);
      } catch (error) {
        console.error("Error occurred:", error);
      }

      setIsLoading(false);
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
    } else if (timePeriod === "1-month") {
      startDate.setMonth(currentDate.getMonth() - 1);
    } else if (timePeriod === "1-year") {
      startDate.setFullYear(currentDate.getFullYear() - 1);
    }

    return startDate.toISOString().split("T")[0];
  };

  const handleTimePeriodChange = (event) => {
    setTimePeriod(event.target.value);
    setCurrentPage(1); // Reset the page when the time period changes
    setRepositories([]); // Reset the repositories when the time period changes
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight && !isLoading && !isDataEnd) {
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
        <TimePeriodSelector value={timePeriod} onChange={handleTimePeriodChange} />

        {/* Display the list of repositories */}
        {repositories.map((repo, index) => (
          <Accordion
            key={repo.id}
            repo={repo}
            index={index}
            activeAccordion={activeAccordion}
            commitActivity={commitActivity}
            onClick={() => handleAccordionToggle(index)}
          />
        ))}

        {isLoading && <div>Loading...</div>}

        {isDataEnd && <div>Data End</div>}
      </div>
    </>
  );
};

export default List;
