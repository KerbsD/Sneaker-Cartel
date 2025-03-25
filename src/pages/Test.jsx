import { useState, useEffect } from 'react';
import supabase from './helpers/SupabaseClient';
import { PiUploadSimpleDuotone } from 'react-icons/pi';

const FileUpload = () => {
    const [files, setFile] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [media, setMedia] = useState([]);

    const handleFileChange = async (e) => {
        setFile(e.target.files);
    }

    async function uploadMultipleFiles(files) {
        const uploadPromises = Array.from(files).map(file => {
            return supabase.storage
                .from('sneaker-cartel')
                .upload(`Gallery/${file.name}`, file)
        });

        const results = await Promise.all(uploadPromises)
        if(uploadPromises){
            getMedia();
        }

        results.forEach((result, index) => {
            if (result.error) {
                console.error(`Error uploading file ${files[index].name}:`, result.error)
            } else {
                console.log(`File ${files[index].name} uploaded successfully:`, result.data)
            }
        })
    }

    // const handleUpload = async () => {
    //     try {
    //         setUploading(true);

    //         if (!file) {
    //             alert("Please upload a file");
    //             return;
    //         }

    //         const fileExt = file.name.split(".").pop();
    //         const fileName = `${Math.random()}.${fileExt}`;
    //         const filePath = `${fileName}`

    //         const { data, error } = await supabase
    //             .storage
    //             .from('sneaker-cartel')
    //             .upload("Gallery/" + filePath, file)

    //         if (data) {
    //             getMedia();

    //         } else {
    //             console.log(error);
    //         }

    //     } catch (error) {
    //         alert("Error uploading", error.message)
    //     } finally {
    //         setUploading(false);
    //     }
    // };

    async function getMedia() {
        const { data, error } = await supabase.storage.from('sneaker-cartel').list('Gallery/', {
            limit: 10,
            offset: 0,
            sortBy: {
                column: 'created_at', order:
                    'desc'
            }
        });

        if (data) {
            setMedia(data);
        } else {
            console.log(71, error);
        }

        console.log(data)
    }

    useEffect(() => {
        getMedia();
    }, [])

    return (
        <div>
            <input className='text-zinc-100' type="file" multiple onChange={handleFileChange} />
            <button onClick={() => uploadMultipleFiles(files)} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            <div className='mt-5 text-zinc-100'>
                My Uploads
            </div>

            {
                media.map((medi) =>
                    <div key={medi.id}>
                        <img className='h-40' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${medi.name}`} />
                    </div>
                )
            }
        </div>
    )
}

export default FileUpload