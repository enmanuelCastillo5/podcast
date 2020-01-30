export default class extends React.Component {
    render() {
        return(
        <>
         <h1>Hola - NextJs</h1>
        <p>bienvenido al curso de next JS</p>

        <img src="/static/perfil.jpg" />
        <style jsx>{`
         h1 {
             color: red;
         }
         p {
             color: green;
         }
         img {
             max-with: 50%;
             display: block;
             margin: 0 auto;
         }
        `}</style>
        </>
        )
    }
}