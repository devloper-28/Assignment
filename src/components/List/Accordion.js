import React from "react";

const Accordion = ({ repo, index, activeAccordion, commitActivity, onClick }) => {
  return (
    <div
      className={`accordion-header ${
        index === activeAccordion ? "active repos_box" : "repos_box"
      }`}
      onClick={onClick}
    >
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-3">
              <img src={repo.owner.avatar_url} className="avatar" alt="Owner Avatar" />
            </div>
            <div className="col-9">
              <div className="">
                <p>
                  <div>
                    {repo.name}
                    <span className="arrow">
                      {index === activeAccordion ? "▲" : "▼"}
                    </span>
                  </div>
                  {index === activeAccordion && (
                    <div className="accordion-content">
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
  );
};

export default Accordion;
