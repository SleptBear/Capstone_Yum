function Footer ({isLoaded}) {
    // if(!isLoaded) return null
    return (
        <div className='footer'>
            <div>Developer Info</div>
            <div className='Footer-div'>
                <div className='dev'>
                    <div> Kian Seyedjafari</div>
                    <a href='https://github.com/SleptBear' target='_blank'>GitHub</a>
                    <a href='https://www.linkedin.com/in/kian-seyedjafari-6a381216b' target='_blank'>LinkedIn</a>
                </div>
            </div>

        </div>

    )
}

export default Footer;
