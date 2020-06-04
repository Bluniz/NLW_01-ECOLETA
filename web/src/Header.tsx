import React from 'react';


//Todo componente tem q ter letra maiuscula no inicio
//FC = Function Component, um componente no formato de função - é um generic, um tipo do typeScript que pode receber um parâmetro
//Para mostrar variaveis javaScript se coloca dentro de chaves {}
interface HeaderProps{
  title?: string;
}

const Header: React.FC<HeaderProps> = (props) =>{
  return(
    <header>
      
         <h1>{props.title}</h1>
    </header>
  );
}



export default Header;