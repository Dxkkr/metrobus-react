import React from 'react';
import '../../styles/Notifica.css'

const App: React.FC = () => {
    return (
        <div className="box">
            <div>
                <h1 id="title">Notificações</h1>
                <div className="Notif">
                    {/* Local onde Vai ser Exibido todos as Notificações das Linhas */}
                </div>
            </div>
        </div>
    );
};

export default App;