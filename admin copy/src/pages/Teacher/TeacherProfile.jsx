import React, { useContext, useEffect, useState } from 'react';
import { TeacherContext } from '../../context/TeacherContext';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

const InfoItem = ({ label, value }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base text-gray-900 mt-1">{value}</p>
    </div>
);

export default function TeacherProfile() {
    const { getTeacherById, backendUrl, teacher, updateTeacher } = useContext(TeacherContext);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedData, setUpdatedData] = useState({});
    const [token, setToken] = useState(localStorage.getItem('token'));
    const decodedToken = jwtDecode(token);
    const teacherId = decodedToken.id ? parseInt(decodedToken.id, 10) : null;

    useEffect(() => {
        if (token) {
            getTeacherById(teacherId);
        }
    }, [token]);

    const handleEditClick = () => {
        setUpdatedData({
            name: teacher.name,
            email: teacher.email,
            password: teacher.password,
            old: teacher.old,
            bio: teacher.bio,
            fees: teacher.fees,
            image: teacher.image,
            video: teacher.video,
            location: teacher.location,
            specialization: teacher.specialization,
            levelTeache: teacher.levelTeache,
            degree: teacher.degree,
            speaks: teacher.speaks,
            levelSpeak: teacher.levelSpeak,
            courseDescription: teacher.courseDescription,
        });
        setIsEditing(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        await updateTeacher(teacherId, updatedData);
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header Section */}
                    <div className="relative h-48 bg-gradient-to-r from-blue-500 to-blue-600">
                        <div className="absolute bottom-0 left-0 w-full transform translate-y-1/2 px-8">
                            <div className="flex items-center">
                                <img 
                                    src={teacher.image} 
                                    alt={teacher.name}
                                    className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                />
                                <div className="ml-6">
                                    <h1 className="text-3xl font-bold text-white">{teacher.name}</h1>
                                    <p className="text-blue-100">{teacher.specialization}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="mt-24 px-8 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column */}
                            <div className="space-y-6">
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                                    <InfoItem label="Email" value={teacher.email} />
                                    <InfoItem label="Password" value={teacher.password} />
                                    <InfoItem label="Old" value={teacher.old} />
                                    <InfoItem label="Location" value={teacher.location} />
                                </div>
                                
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-semibold mb-4">Languages</h3>
                                    <InfoItem label="Speaks" value={teacher.speaks} />
                                    <InfoItem label="Level" value={teacher.levelSpeak} />
                                </div>
                            </div>

                            {/* Center Column */}
                            <div className="md:col-span-2 space-y-6">
                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-semibold mb-4">About Me</h3>
                                    <p className="text-gray-600 leading-relaxed">{teacher.bio}</p>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-semibold mb-4">Teaching</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <InfoItem label="Level" value={teacher.levelTeache} />
                                        <InfoItem label="Degree" value={teacher.degree} />
                                        <InfoItem label="Course Fee" value={`$${teacher.fees}`} />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl shadow-sm p-6">
                                    <h3 className="text-xl font-semibold mb-4">Course Description</h3>
                                    <p className="text-gray-600 leading-relaxed">{teacher.courseDescription}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                onClick={handleEditClick}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                                Edit Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            {isEditing && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                value={updatedData.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            
                            <input
                                type="email"
                                name="email"
                                value={updatedData.email}
                                onChange={handleInputChange}
                                placeholder="Email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                            type="text"
                            name= "password"
                            value={updatedData.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input 
                            type="text"
                            name="old"
                            value={updatedData.old}
                            onChange={handleInputChange}
                            placeholder="Old"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                                type="text"
                                name="location"
                                value={updatedData.location}
                                onChange={handleInputChange}
                                placeholder="Location"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                            type="text"
                            name='specialization'
                            value={updatedData.specialization}
                            onChange={handleInputChange}
                            placeholder="Specialization"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                            type="text"
                            name="levelTeache"
                            value={updatedData.levelTeache}
                            onChange={handleInputChange}
                            placeholder="Level Teacher"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                            type="text"
                            name="degree"
                            value={updatedData.degree}
                            onChange={handleInputChange}
                            placeholder="Degree"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                            type="text"
                            name="levelSpeak"
                            value={updatedData.levelSpeak}
                            onChange={handleInputChange}
                            placeholder="Level Speak"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <input
                                type="number"
                                name="fees"
                                value={updatedData.fees}
                                onChange={handleInputChange}
                                placeholder="Fees"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />

                            <div className="md:col-span-2">
                                <textarea
                                    name="bio"
                                    value={updatedData.bio}
                                    onChange={handleInputChange}
                                    placeholder="Bio"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                            </div>

                            <div className="md:col-span-2">
                                <textarea
                                    name="courseDescription"
                                    value={updatedData.courseDescription}
                                    onChange={handleInputChange}
                                    placeholder="Course Description"
                                    rows="4"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                ></textarea>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-8">
                            <button
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
