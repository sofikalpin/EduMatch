import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../HeaderAdministrador';
import Footer from '../FooteraAdministrador';
import SearchInput from './SearchInput';
import TeacherTable from './TeacherTable';
import ErrorBanner from './ErrorBanner';
import LoadingSpinner from './LoadingSpinner';

import { useFetchTeachers } from '../hooks/useFetchTeachers';
import { socialIcons } from '../constants/socialIcons';
import logo from '../../../logo/LogoInicio.png';

const CargarProfesor: React.FC = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = React.useState('');
    
    const { 
        teachers, 
        loading, 
        error, 
        deleteTeacher, 
        authorizeTeacher 
    } = useFetchTeachers();

    const filteredTeachers = useMemo(() => 
        teachers.filter(teacher => 
            teacher.nombrecompleto.toLowerCase().includes(searchTerm.toLowerCase())
        ), 
        [teachers, searchTerm]
    );

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header onNavigate={navigate} logo={logo} />
            
            <div className="container mx-auto px-4 py-6">
                <SearchInput 
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Buscar profesor..."
                />

                {error && <ErrorBanner message={error} />}
                
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <TeacherTable 
                        teachers={filteredTeachers}
                        onDelete={deleteTeacher}
                        onAuthorize={authorizeTeacher}
                    />
                )}
            </div>

            <Footer socialIcons={socialIcons} />
        </div>
    );
};

export default CargarProfesor;