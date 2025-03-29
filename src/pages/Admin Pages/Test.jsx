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

            setUploading(true);
            const results = await Promise.all(uploadPromises)

            if (uploadPromises) {
                getMedia(model);
            }

            results.forEach((result, index) => {
                if (result.error) {
                    console.error(`Error uploading file ${files[index].name}:`, result.error)
                } else {
                    console.log(`File ${files[index].name} uploaded successfully:`, result.data)
                    setUploading(false);
                }
            })
        } catch (err) {
            console.error("Error uploading files:", err)
            setUploading(false);
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
        setUploading(false);
    }

    useEffect(() => {
        getMedia();
    }, [])

    return (
        <>
            <button className='my-2' onClick={() => uploadMultipleFiles(files, model)} disabled={uploading}>
                {uploading ? <div className='border-2 border-green-700 bg-green-600 text-stone-100 px-1 py-1 rounded-md'>
                                    <div className='w-6 h-6 border-2 border-stone-100 mx-auto rounded-full border-t-green-600 animate-spin'></div>
                             </div>
                            : <div className='border-2 border-green-700 bg-green-600 text-stone-100 px-1 py-1 rounded-md'>Upload</div>}
            </button>
            <div className='mt-5 text-zinc-100 overflow-x-scroll'>
                Preview:
                <div className="relative inline-block">
                    <div className="flex space-x-4 snap-x snap-mandatory no-scrollbar">
                        {
                            media.map((med) =>
                                <div key={med.id}>
                                    <img className='h-40' src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${model}/${med.name}`} alt='no Image' />
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


