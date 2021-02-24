import React from 'react';

import './styles.css';

const TinyText = () => {
    return (        
        <div className="page-text-tiny">
            <p>
                **Atenção! O valor apresentado é apenas uma simulação. 
                Podem haver variações no valor final.
                <br/>
                ***A parcela sofrerá correções de INCC.
                <br/>
                Em caso de dúvidas consulte um Consultor Prestes.
            </p>
        </div>        
    );
}

export default TinyText;