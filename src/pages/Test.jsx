import { useEffect, useState } from 'react';
import supabase from './helpers/supabaseClient';

function Test() {
    const [media, setMedia] = useState([])

    const imageUpload = async (e) => {
        let file = e.target.files[0];


        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error } = await supabase
            .storage
            .from('sneaker-cartel')
            .upload("Gallery/" + filePath, file)
        data ? getMedia() : console.error(error)
    }

    const getMedia = async () => {
        const { data, error } = await supabase
            .storage
            .from('sneaker-cartel')
            .list('Gallery',
                {
                    limit: 10,
                    offset: 0,
                    sortBy: {
                        column: 'name',
                        order: 'desc'
                    }
                }
            )
        data ? setMedia(data) : console.error(error)

        console.log(media)
    }

    useEffect(() => {
        getMedia()
    }, [])

    return (
        <div>
            <h1 className="text-3xl text-zinc-50 p-3">Testing for Supabase</h1>
            <input className='text-zinc-50 ' type="file" onChange={(e) => imageUpload(e)} />
            <h2 className='p-3 text-zinc-50'>My Media:</h2>
            {
                media?.map(media => (
                    <div key={media.id}>
                        <img src={`https://begpetjiutjcxrwmwdof.supabase.co/storage/v1/object/public/sneaker-cartel/Gallery/${media.name}`} alt="" />
                    </div>
                ))
            }
        </div>
    )
}

export default Test;