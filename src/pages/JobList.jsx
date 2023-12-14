import { useEffect } from "react"
import axios from "axios"
import { useDispatch,useSelector} from "react-redux";
import { setJobs } from "../redux/jobSlice";
import { FaMapMarkedAlt,FaRegCalendarAlt ,FaShoppingBag } from "react-icons/fa";
import Filter from "../components/Filter";


const JobList = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.jobReducer)

    useEffect(() => {
        axios
        .get("http://localhost:3060/jobs")
        .then((res) => dispatch(setJobs(res.data)) )
    },[]);
  return (
  <>
  <Filter/>
  <h3 className="job-count">Bulunan ({state.jobs.length}) arasından 
           ({state.filtredJobs.length}) tanesini görüntülüyorsunuz</h3>
      <section className="list-section">
        {!state.initialized  ? (<p>Loading...</p>) : (
          state.filtredJobs.map((job)=> (
            <div className="job-card">
              <div className="head">
                <div className="letter">
                  <p>{job.company[0]}</p>
                </div>
                <div className="info">
                  <p>{job.position}</p>
                  <p>{job.company}</p>
                </div>
              </div>
              <div className="body">
                <div className="field">
                <FaMapMarkedAlt />
                  <p>{job.location}</p>
                </div>
                <div className="field">
                <FaRegCalendarAlt />
                  <p>{job.date}</p>
                </div>
                <div className="field">
                <FaShoppingBag />
                  <p>{job.type}</p>
                </div>
                <div className="status">
                  <span className={job.status}>{job.status}</span>
                </div>
              </div>
            </div>
            ))
        )}
      </section>
  </>
      
    )
}

export default JobList;