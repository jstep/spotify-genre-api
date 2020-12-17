import React from 'react'
import spotify_logo from './assests/spotify_logo.png'

export default function Detail({album, artists, name}) {
    return (
        <div className='offset-md-1 ol-sm-4'>
            <div className='row col-sm-12 px-0'>
                <img 
                    className='album_art'
                    src={album.images[0].url}
                    alt={name}></img>
            </div>
            <div className='row col-sm-12 px-0'>
                <label htmlFor={name} className='form-label col-sm-12'>
                    {name}
                </label>
            </div>
            <div className='row col-sm-12 px-0'>
                <label htmlFor={artists[0].name} className='form-label col-sm-12'>
                    {artists[0].name}
                </label>
            </div>
            <div className='row col-sm-12 px-0'>
                <label htmlFor={artists[0].name} className='form-label col-sm-12'>
                    <a href={artists[0].uri}><img src={spotify_logo} className='logo'/></a>

                </label>
            </div>
        </div>
    )
}
