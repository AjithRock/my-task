
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { jobManagment } from './services/Api'
import Card from './components/card';
import Modal from './components/modal';


export default function App() {

  const [jobList, setJobList] = useState([])
  const [jobModal, setJobModal] = useState(false)
  const [current, setCurrent] = useState(0);
  const [jobData, setJobData] = useState({
    "jobTitle": "",
    "companyName": "",
    "industry": "",
    "location": "",
    "remoteType": "",
    "experienceMin": '',
    "experienceMax": '',
    "salaryMin": '',
    "salaryMax": '',
    "totalEmployees": '',
    "applyType": '',
  })
  const [isError, setIsError] = useState(false)

  const next = () => {

    const { jobTitle, companyName, industry } = jobData;

    if (jobTitle != '' && companyName != '' && industry != '') {
      setIsError(false)
      setCurrent(current + 1);
    } else {
      setIsError(true)
    }
  };

  const onInputChange = (value, key) => {
    let data = { ...jobData }
    data[key] = value;
    setJobData(data)
  }

  useEffect(() => {
    axios.get(jobManagment.getJobList).then((response) => {
      const { data, status } = response
      if (status == 200) {
        console.log(data)
        setJobList(data)
      }
    }).catch((error) => {
      console.log(error);
    })
  }, [])

  const onApply = (id) => {
    console.log(id)
  }

  const onSave = () => {
    console.log(jobData)
    axios.post(jobManagment.postJob, jobData).then(() => {
      setJobModal(false)
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="bg-[#d8d8d8]">
      <div className="p-10 flex justify-end">
        <button className='bg-[#1597E4] text-white  py-2 px-4 rounded' onClick={() => setJobModal(true)}>
          Create Job
        </button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-20 p-10 justify-items-center">
        {jobList.map((job) => <Card key={job.id} data={job} onApply={(id) => onApply(id)} />)}
      </div>

      <Modal open={jobModal} title="Create Job"
        extra={(<div className='text-xl font-semibold'>
          Step {current + 1}
        </div>)}>

        {current == 0 ? <StepOneForm isError={isError} data={jobData} onInputChange={onInputChange} /> : <StepTwoForm data={jobData} onInputChange={onInputChange} />}
        <div className='mt-24 flex justify-end'>
          {current === 0 && (
            <button className='bg-[#1597E4] text-white  py-2 px-4 rounded' onClick={() => next()}>
              Next
            </button>
          )}
          {current === 1 && (
            <button className='bg-[#1597E4] text-white  py-2 px-4 rounded' onClick={() => onSave()}>
              Save
            </button>
          )}
        </div>
      </Modal>

    </div >

  )
}

const StepOneForm = ({ data, onInputChange, isError }) => {

  const { jobTitle, companyName, industry, location, remoteType } = data
  return (
    <>
      <div className='mt-6'>
        <label className="required">Job title</label>
        <div className="pt-1">
          <input type="text" value={jobTitle} placeholder="ex. UX UI Designer" className={`${isError && jobTitle == '' ? '!border-[#D86161]' : '!border-[#cccccc]'}`} onChange={(e) => onInputChange(e.target.value, 'jobTitle')} />
        </div>
      </div>
      <div className='mt-6'>
        <label className="required">Company name</label>
        <div className="pt-1">
          <input type="text" value={companyName} placeholder="ex. Google" className={`${isError && companyName == '' ? '!border-[#D86161]' : '!border-[#cccccc]'}`} onChange={(e) => onInputChange(e.target.value, 'companyName')} />
        </div>
      </div>
      <div className='mt-6'>
        <label className="required">Industry</label>
        <div className="pt-1">
          <input type="text" value={industry} placeholder="ex. Information Technology" className={`${isError && industry == '' ? '!border-[#D86161]' : '!border-[#cccccc]'}`} onChange={(e) => onInputChange(e.target.value, 'industry')} />
        </div>
      </div>
      <div className='mt-6 flex justify-between'>
        <div>
          <label >location</label>
          <div className="pt-1">
            <input type="text" value={location} placeholder="ex. Chennai" onChange={(e) => onInputChange(e.target.value, 'location')} />
          </div>
        </div>
        <div>
          <label >Remote type</label>
          <div className="pt-1">
            <input type="text" value={remoteType} placeholder="ex. In-office" onChange={(e) => onInputChange(e.target.value, 'remoteType')} />
          </div>
        </div>
      </div>
    </>
  )
}


const StepTwoForm = ({ data, onInputChange }) => {

  const { experienceMin, experienceMax, salaryMin, salaryMax, totalEmployees, applyType } = data
  return (
    <>
      <div className='mt-6 '>
        <div>
          <label>Experience</label>
          <div className='flex justify-between'>
            <div className="pt-1">
              <input type="text" value={experienceMin} placeholder="Minimum" onChange={(e) => onInputChange(e.target.value, 'experienceMin')} />
            </div>
            <div className="pt-1">
              <input type="text" value={experienceMax} placeholder="Maximum" onChange={(e) => onInputChange(e.target.value, 'experienceMax')} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <div>
          <label>Salary</label>
          <div className='flex justify-between'>
            <div className="pt-1">
              <input type="text" value={salaryMin} placeholder="Minimum" onChange={(e) => onInputChange(e.target.value, 'salaryMin')} />
            </div>
            <div className="pt-1">
              <input type="text" value={salaryMax} placeholder="Maximum" onChange={(e) => onInputChange(e.target.value, 'salaryMax')} />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-6'>
        <label >Total employee</label>
        <div className="pt-1">
          <input type="text" placeholder="ex. 100" value={totalEmployees} onChange={(e) => onInputChange(e.target.value, 'totalEmployees')} />
        </div>
      </div>
      <div className='mt-6'>
        <label >Apply type</label>
        <div className="pt-1">
          <input type="radio" name="applyType" value="Quick Apply" onChange={(e) => onInputChange(e.target.value, 'applyType')} />
          <label htmlFor="applyType" className="ml-2 text-[#7a7a7a] !font-normal">Quick apply</label>
          <input type="radio" className="ml-4" name="applyType" value="External Apply" onChange={(e) => onInputChange(e.target.value, 'applyType')} />
          <label htmlFor="applyType" className="ml-2 text-[#7a7a7a] !font-normal">External apply</label>
        </div>
      </div>
    </>
  )
}
