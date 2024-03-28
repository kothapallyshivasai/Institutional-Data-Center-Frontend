import React from 'react';

export default function FilterBar({setDepartmentChoice, setCgpaChoice, setBatchChoice, batchChoice, setSkillChoice,
                                   uniqueBatches, uniqueDepartments, uniqueSkills, uniqueCertifications}) {
  
  return (
    <div>
      <div className="card shadow">
        <div className="card-body">
          <div className="row">
            <h5><b>Filters</b></h5>
          </div>
          <hr />
          
          <div className="mb-2">
            <b>Certifications</b>
            {uniqueCertifications.map((certification, index) => (
              <div className={`form-check ${index === 0 ? 'mt-2' : ''}`} key={index}>
                <input
                  className="form-check-input"
                  type="radio"
                  id={`c${index}`}
                  name="certification"
                />
                <label className="form-check-label" htmlFor={`c${index}`}>{certification}</label>
              </div>
            ))}
          </div>

          <b>Batch & Dept</b>  
          <div className="row mt-1">
            {uniqueBatches.map((batch, index) => (
              <div key={index} className="col-3 mb-2">
                  <button className={`btn border-secondary ${batchChoice === batch && 'btn-success'}`} onClick={() => setBatchChoice(batch)}>{batch}</button>
              </div>
            ))}
          </div>
          
          <div className="mb-2">
            {uniqueDepartments.map((department, index) => (
              <div className="form-check" key={index}>
                  <input
                      className="form-check-input"
                      onChange={() => setDepartmentChoice(department)}
                      type="radio"
                      id={`dept_${index}`}
                      name="batch_dept"
                  />
                  <label className="form-check-label" htmlFor={`dept_${index}`}>{department}</label>
              </div>
            ))}
          </div>

          <b>CGPA</b>
          <div className="form-check mt-2">
            <input className="form-check-input" type="radio" onChange={() => setCgpaChoice(9.0)} id="cg1" name="cgpa" />
            <label className="form-check-label" htmlFor="cg1"> &gt; 9.0 </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" onChange={() => setCgpaChoice(8.0)} id="cg2" name="cgpa" />
            <label className="form-check-label" htmlFor="cg2"> &gt; 8.0 </label>
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="radio" onChange={() => setCgpaChoice(7.0)} id="cg3" name="cgpa" />
            <label className="form-check-label" htmlFor="cg3"> &gt; 7.0 </label>
          </div>

          <b>Skills</b>
          <div className="mb-2">
            {uniqueSkills.map((skill, index) => (
                <div className={`form-check ${index === 0 ? 'mt-2' : ''}`} key={index}>
                  <input
                    className="form-check-input"
                    type="radio"
                    id={`sk${index}`}
                    name="skills"
                    onChange={() => setSkillChoice(skill)} 
                  />
                  <label className="form-check-label" htmlFor={`sk${index}`}>{skill}</label>
                </div>
            ))}
          </div>

          <b>Internships</b>
          <div className="form-check mt-2">
            <input className="form-check-input" type="radio" id="i1" name="internships" />
            <label className="form-check-label" htmlFor="i1"> On-Site </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" id="i2" name="internships" />
            <label className="form-check-label" htmlFor="i2"> Remote </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" id="i3" name="internships" />
            <label className="form-check-label" htmlFor="i3"> Hybrid </label>
          </div>
        </div>
      </div>
    </div>
  );
}