// src/Notification.tsx
import React, { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import '../../styles/Notifica.css'

// Define os tipos de dados
interface Notificacao {
    id: number;
    titulo: string;
    mensagem: string;
    tipo: string;
    data_envio: string;
}

const Notification: React.FC = () => {
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]); // Adicionado o tipo correto
    const [error, setError] = useState<string | null>(null);

    // Função para buscar notificações pendentes
    const buscarNotificacoesPendentes = async () => {
        try {
            const { data, error } = await supabase
                .from('notificacoes')
                .select('id, titulo, mensagem, tipo, data_envio');

            if (error) {
                console.error('Erro retornado pelo Supabase:', error.message, error.details);
                throw new Error(`Erro na consulta: ${error.message}`);
            }

            if (!data || !Array.isArray(data)) {
                console.error('Dados retornados não são um array:', data);
                throw new Error('Formato inesperado de dados retornados pela API.');
            }

            setNotificacoes(data);
        } catch (error: any) {
            setError(error.message || 'Erro desconhecido ao buscar notificações.');
            console.error('Erro capturado:', error);
        }
    };

    // Usar o useEffect para buscar notificações ao carregar o componente
    useEffect(() => {
        buscarNotificacoesPendentes();
    }, []);

    return (
        <div>
            <h2 className='title-notifica'>Notificações de Incidentes de Ônibus</h2>
            {error && (
                <p style={{ color: 'red' }}>
                    <strong>Erro:</strong> {error}
                </p>
            )}
            <div className='grids'>
                {notificacoes.map((notificacao) => (
                    <div key={notificacao.id} className="notification">
                        <div className='notititle'>{notificacao.titulo}</div>
                        <div className='notibody'>{notificacao.mensagem}</div>
                        <div className='notibody'>Tipo: {notificacao.tipo}</div>
                        <div className='notibody'>Data de envio: {new Date(notificacao.data_envio).toLocaleString()}</div>
                    </div>
                ))}
                </div>
        </div>
    );
};

export default Notification;


{/* <ul>
{notificacoes.map((notificacao) => (
  <li key={notificacao.id} className="notificacao">
    <h4>{notificacao.titulo}</h4>
    <p>{notificacao.mensagem}</p>
    <p>Tipo: {notificacao.tipo}</p>
    <p>Data de envio: {new Date(notificacao.data_envio).toLocaleString()}</p>
  </li>
))}
</ul> */}

// {notificacoes.length > 0 ? (
//     <ul>
//         {notificacoes.map((notificacao) => (
//             <li key={notificacao.id} className="notification">
//                 <h1 className="notiglow">Título:{notificacao.titulo.toString()}</h1>
//                 <h2 className="notiborderglow">Mensagem: {notificacao.mensagem.toString()}</h2>
//                 <p className="notititle">Tipo: {notificacao.tipo.toString()}</p>
//                 <p className="notibody">Data de envio: {new Date(notificacao.data_envio).toLocaleString()}</p>
//             </li>
//         ))}
//     </ul>
// ) : (
//     <p>Sem notificações no momento</p>
// )}