import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen">
            <Navbar />

            <section className="main-section">
                <div className="page-heading py-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="mb-4">Smart feedback for your <span className="text-gradient">dream job</span></h1>
                    {isProcessing ? (
                        <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
                            <h2 className="text-indigo-600 font-bold animate-pulse">{statusText}</h2>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-progress"></div>
                            </div>
                            <img src="/images/resume-scan.gif" className="w-full max-w-md rounded-xl shadow-inner border border-gray-100" alt="Processing" />
                            <p className="text-gray-500 text-sm">This might take a few moments...</p>
                        </div>
                    ) : (
                        <h2 className="max-w-2xl mx-auto">Drop your resume for an ATS score and improvement tips</h2>
                    )}
                    {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-8 w-full max-w-4xl bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                <div className="form-div">
                                    <label htmlFor="company-name">Company Name</label>
                                    <input type="text" name="company-name" placeholder="e.g. Google, Microsoft, Startup Inc." id="company-name" className="focus:ring-2 focus:ring-indigo-500/20" />
                                </div>
                                <div className="form-div">
                                    <label htmlFor="job-title">Job Title</label>
                                    <input type="text" name="job-title" placeholder="e.g. Frontend Developer, Product Manager" id="job-title" className="focus:ring-2 focus:ring-indigo-500/20" />
                                </div>
                            </div>
                            
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description (Optional)</label>
                                <textarea 
                                    name="job-description" 
                                    placeholder="Paste the job description here to get tailored feedback..." 
                                    id="job-description" 
                                    rows={4}
                                    className="focus:ring-2 focus:ring-indigo-500/20 resize-none"
                                />
                            </div>

                            <div className="w-full border-t border-gray-100 pt-6">
                                <label className="mb-3 block">Upload Resume (PDF)</label>
                                <FileUploader onFileSelect={handleFileSelect} />
                            </div>

                            <button 
                                type="submit" 
                                disabled={!file}
                                className={`primary-button mt-4 text-lg py-4 transition-all duration-300 ${!file ? 'opacity-50 cursor-not-allowed grayscale' : 'hover:scale-[1.02] shadow-lg hover:shadow-indigo-500/30'}`}
                            >
                                {file ? 'Analyze Resume' : 'Upload a PDF to Continue'}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    )
}
export default Upload
