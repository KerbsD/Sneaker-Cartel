import { useState, useEffect } from 'react';
import supabase from '../helpers/SupabaseClient';

const Test = ({ folderName, images }) => {
    const [uploading, setUploading] = useState(false);
    const [media, setMedia] = useState([]);
    let model = folderName;
    let files = images

    async function uploadMultipleFiles(files, model) {
        try {
            const uploadPromises = Array.from(files).map(file => {
                return supabase.storage
                    .from('sneaker-cartel')
                    .upload(`Gallery/${model}/${file.name}`, file)
            });

            const results = await Promise.all(uploadPromises)

            if (uploadPromises) {
                getMedia(model);
            }

            results.forEach((result, index) => {
                if (result.error) {
                    console.error(`Error uploading file ${files[index].name}:`, result.error)
                } else {
                    console.log(`File ${files[index].name} uploaded successfully:`, result.data)
                }
            })
        } catch (err) {
            console.error("Error uploading files:", err)
        }
    }

    async function getMedia(model) {
        const { data, error } = await supabase.storage.from('sneaker-cartel').list('Gallery/' + model, {
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
    }

    useEffect(() => {
        getMedia();
    }, [])

    return (
        <>
            <button onClick={() => uploadMultipleFiles(files, model)} disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            <div className='mt-5 text-zinc-100 overflow-x-scroll'>
                Preview:
                <div className="relative inline-block">
                    <div className="flex space-x-4 snap-x snap-mandatory no-scrollbar">
                        {
                            media.map((medi) =>
                                <div key={medi.id}>
                                    <img className='h-40' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${model}/${medi.name}`} alt='no Image'/>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Test;


