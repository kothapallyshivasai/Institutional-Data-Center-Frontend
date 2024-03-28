import React from 'react'

export default function StudentCard({ student }) {
  return (
    <div>
        <div className="card mt-2 mb-4 shadow">
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-2 col-12 justify-content-sm-end align-items-sm-top d-flex">
                        <img src={student.profilePicture} alt="No profile picture" className='img-fluid img-student-profile' />
                    </div>
                    <div className="col-sm-10 mt-sm-0 mt-2 col-12">
                        <h5><b>{student.studentName}</b> | {student.studentId}</h5>
                        <div className="row">
                            <div className="col-sm-3 col-4 text-muted">
                                <i className="bi bi-dot"></i> CGPA: {student.cgpa}
                            </div>
                            <div className="col-sm-3 col-4 text-muted">
                                <i className="bi bi-dot"></i> Dept: {student.department}
                            </div>
                            <div className="col-sm-3 col-4 text-muted">
                                <i className="bi bi-dot"></i> {student.batch}
                            </div>
                        </div>
                        <div className="text-muted">
                            Skills: Mobile App Development | Certification: AWS, Cisco, Oracle | One Internship experience
                        </div>
                        <div className="text-muted mt-1">
                            <u>See Full Profile</u>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
