// import dependencies
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
// import components
import Useridcontext from "../../context/userid-context";
import Button from "../../generalcomponent/Button";
import Job from "./parts/Job";
import NotLoggedIn from "../../generalcomponent/NotLoggedIn";

const MyJobs = () => {
  // context
  const { userId, picsArray } = useContext(Useridcontext);
  const employerid = userId;

  // states
  const [fetchedJobs, setFetchedJobs] = useState("");

  // fetch jobs on mount
  useEffect(() => {
    async function fetcher() {
      try {
        const endpoint = `http://localhost:5000/myjobs/${employerid}`;
        const res = await axios.get(endpoint);
        setFetchedJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    if (userId) {
      fetcher();
    }
  }, [employerid]);

  // create job components to populate page
  const jobs = [];
  if (fetchedJobs) {
    fetchedJobs.map((element, index) => {
      jobs.push(
        <Link to={`/individualjob/${index}`}>
          <Job
            {...element}
            key={uuidv4()}
            imageUrl={
              picsArray[Math.floor(Math.random() * picsArray.length)].src.medium
            }
          ></Job>
        </Link>
      );
    });
  }

  return (
    <div>
      {userId ? (
        <>
          <h1>My Jobs</h1>
          <Link to="/postjobs">
            <Button value="Add Job"></Button>
          </Link>
          <Link to="/employeemarketplace">
            <Button value="Employee Marketplace"></Button>
          </Link>
          <div>{jobs}</div>
        </>
      ) : (
        <NotLoggedIn />
      )}
    </div>
  );
};

export default MyJobs;