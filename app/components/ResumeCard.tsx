import {Link} from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }

        loadResume();
    }, [imagePath]);

    return (
        <Link to={`/resume/${id}`} className="block h-full group">
            <div className="resume-card animate-in fade-in duration-1000 flex flex-col h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group-hover:-translate-y-1">
                <div className="p-6 pb-4 flex items-start justify-between border-b border-gray-50">
                    <div className="flex flex-col gap-1 pr-4">
                        {companyName ? (
                            <h2 className="text-xl font-bold text-gray-900 line-clamp-1">{companyName}</h2>
                        ) : (
                            <h2 className="text-xl font-bold text-gray-900">Resume Analysis</h2>
                        )}
                        {jobTitle ? (
                            <p className="text-sm font-medium text-gray-500 line-clamp-1">{jobTitle}</p>
                        ) : (
                            <p className="text-sm font-medium text-gray-500">No job title specified</p>
                        )}
                    </div>
                    <div className="flex-shrink-0 transform transition-transform group-hover:scale-105">
                        <ScoreCircle score={feedback.overallScore} />
                    </div>
                </div>
                
                <div className="flex-1 p-4 bg-gray-50/50">
                    {resumeUrl ? (
                        <div className="relative w-full h-full min-h-[250px] rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-white group-hover:shadow-md transition-shadow">
                            <img
                                src={resumeUrl}
                                alt="Resume preview"
                                className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    ) : (
                        <div className="w-full h-full min-h-[250px] flex items-center justify-center bg-gray-100 rounded-xl border border-gray-200 border-dashed">
                            <div className="flex flex-col items-center gap-2 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-sm">Preview loading...</span>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md group-hover:bg-indigo-100 transition-colors">
                        View Analysis
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}
export default ResumeCard
