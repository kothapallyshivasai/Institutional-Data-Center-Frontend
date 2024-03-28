import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';
import "../css/admin_home.css";
import AdminTopBar from './AdminTopBar';
import axios from 'axios';
import FilterBar from './FilterBar';
import StudentCard from './StudentCard';
import { jwtDecode } from 'jwt-decode';
import StudentPagination from './StudentPagination';
import PageSelection from './PageSelection';

export default function AdminHome() {
    const { jwtToken, logoutUser } = useContext(AuthContext);

    const [totalStudents, setTotalStudents] = useState([]);
    const [modifiedStudents, setModifiedStudents] = useState([]);
    
    const [certificationChoice, setCertificationChoice] = useState(null);
    const [batchChoice, setBatchChoice] = useState(null);
    const [departmentChoice, setDepartmentChoice] = useState(null);
    const [cgpaChoice, setCgpaChoice] = useState(null);
    const [skillChoice, setSkillChoice] = useState(null);
    const [internshipChoice, setInternshipChoice] = useState(null);

    const [uniqueBatches, setUniqueBatches] = useState([])
    const [uniqueDepartments, setUniqueDepartments] = useState([])
    const [uniqueSkills, setUniqueSkills] = useState([])
    const [uniqueCertifications, setUniqueCertifications] = useState([])

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    useEffect(() => {

        async function getStudentData() {
            try {
                const unqBatches = await getUniqueBatches(logoutUser, jwtToken)
                setUniqueBatches(unqBatches)

                const unqdept = await getUniqueDepartments(logoutUser, jwtToken)
                setUniqueDepartments(unqdept)

                const unqskill = await getUniqueSkills(logoutUser, jwtToken)
                setUniqueSkills(unqskill)

                const unqCertification = await getUniqueCertifications(logoutUser, jwtToken)
                setUniqueCertifications(unqCertification)

                const url = "http://127.0.0.1:9000/student/get-all-students";
                const response = await axios.get(url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + jwtToken
                    }
                });
                const studentsWithImages = await Promise.all(response.data.map(async student => {
                    const imageData = await getStudentImage(student.profilePicture);
                    const newCpga = parseFloat(student.cgpa)
                    if (imageData != null){
                        return { ...student, profilePicture: URL.createObjectURL(imageData), cgpa: newCpga };
                    }
                    return { ...student, cgpa: newCpga };;
                }));

                const studentsWithSkills = await Promise.all(studentsWithImages.map(async student => {
                    const skillData = await getSkillsByStudent(jwtToken, student.studentId);
                    return {...student, skills: skillData};
                }))

                setTotalStudents(studentsWithSkills);
                setModifiedStudents(studentsWithSkills);
            } catch (e) {
                console.log(e)
                logoutUser();
            }
        }
        
        async function getStudentImage(imageUrl) {
            try {
                const response = await axios.get("http://127.0.0.1:9000" + imageUrl, {
                    headers: {
                        'Authorization': 'Bearer ' + jwtToken,
                    },
                    responseType: 'arraybuffer'
                });
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                return blob;
            } catch (error) {
                return null;
            }
        }

        
        getStudentData()
    }, []);

    // Filters
    useEffect(() => {
        let filteredStudents = totalStudents;

        // department
        if (departmentChoice) {
            filteredStudents = filteredStudents.filter(student => student.department === departmentChoice);
        }
    
        // cgpa
        if (cgpaChoice) {
            filteredStudents = filteredStudents.filter(student => student.cgpa >= cgpaChoice);
        }

        // batch
        if(batchChoice){
            filteredStudents = filteredStudents.filter(student => student.batch === batchChoice);
        }

        // skill
        if (skillChoice) {
            filteredStudents = filteredStudents.filter(student => 
                student.skills && 
                Array.isArray(student.skills) && 
                student.skills.some(skill => skill.domain.includes(skillChoice)) 
            );
        }
    
        setModifiedStudents(filteredStudents);
    }, [departmentChoice, cgpaChoice, batchChoice, skillChoice])
    
    validateAdmin()

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = modifiedStudents.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(modifiedStudents.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="container-fluid">
            <AdminTopBar />

            <div className="body-part pb-5 mt-3">
                <div className="row pt-4">
                    <div className="col-xl-3 col-lg-4">
                        <FilterBar setDepartmentChoice={setDepartmentChoice} setCgpaChoice={setCgpaChoice} setBatchChoice={setBatchChoice} 
                                   batchChoice={batchChoice} uniqueBatches={uniqueBatches} uniqueDepartments={uniqueDepartments}
                                   uniqueSkills={uniqueSkills} uniqueCertifications={uniqueCertifications} setSkillChoice={setSkillChoice}
                        />
                    </div>
                    <div className="col-xl-7 col-lg-8 offset-xl-1">
                        <PageSelection modifiedStudents={modifiedStudents} itemsPerPage={itemsPerPage} setItemsPerPage={setItemsPerPage} />
                        {modifiedStudents.length === 0 ? (
                            <p className='mt-5 text-center'>No students available</p>
                        ) : (
                            <>
                                {currentItems.map((student, index) => (
                                    <StudentCard key={index} student={student} />
                                ))}

                                <StudentPagination currentPage={currentPage} handlePageChange={handlePageChange} pageNumbers={pageNumbers} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

async function getUniqueBatches(logoutUser, jwtToken){
    try {
        const url = "http://127.0.0.1:9000/student/get-unique-batches";
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            }
        });
        return response.data;
    }
    catch(e){
        logoutUser()
    }
}

async function getUniqueDepartments(logoutUser, jwtToken){
    try {
        const url = "http://127.0.0.1:9000/student/get-unique-departments";
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            }
        });
        return response.data;
    }
    catch(e){
        logoutUser()
    }
}

async function getUniqueSkills(logoutUser, jwtToken) {
    try {
        const url = "http://127.0.0.1:9000/skill/get-unique-skills";
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            }
        });
        return response.data;
    }
    catch(e){
        logoutUser()
    }
}

async function getUniqueCertifications(logoutUser, jwtToken) {
    try {
        const url = "http://127.0.0.1:9000/certification/get-unique-certifications";
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            }
        });
        return response.data;
    }
    catch(e){
        logoutUser()
    }
}

function validateAdmin(jwtToken, logoutUser){
    if (!jwtToken) {
        return <Navigate to="/login" />;
    }
    
    let username1 = jwtDecode(jwtToken)
    if (username1.sub  !== "admin"){
        logoutUser()
    }
}

async function getSkillsByStudent(jwtToken, studentId){
    try{
        const url = "http://127.0.0.1:9000/skill/get-all-skills-by-student-id/" + studentId;
        const response = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + jwtToken
            }
        });
        return response.data;
    } catch(e){
        return null;
    }
}