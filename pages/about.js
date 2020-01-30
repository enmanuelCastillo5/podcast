export default class extends React.Component {
    render() {
        return (
            <>
            <div>
            <h2>ABOUT: KOBE BRYANT</h2>
            <p>Fue un baloncestista estadounidense que disputó veinte temporadas en la NBA, todas ellas en Los Angeles Lakers, desde 1996 hasta 2016. Era hijo del exjugador de la NBA Joe Bryant.</p>

            <img src="/static/kobe.jpg" />

        <style jsx>
                {`
                h2 {
                    color: #fff;
                    text-align: center;
                }
                p {
                    color: #fff;
                    text-align: center;
                    max-with: 50%;
                    padding: 0 125px;
                }
                img {
                    max-with: 50%;
                    display: block;
                    margin: 0 auto;
                }
                `}
            </style>

            <style jsx global>{`
                body {
                background: #07161B;
                }
                `}
                </style>
            </div>
            </>
        )
    }
}