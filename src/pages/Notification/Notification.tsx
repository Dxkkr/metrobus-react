// // src/Notification.js
// import React, { useEffect, useState } from 'react';
// import { supabase } from '../../client/supabaseClient';

// const Notification = () => {
//   const [notificacoes, setNotificacoes] = useState([]);
//   const [error, setError] = useState(null);

//   // Função para buscar notificações pendentes
//   const buscarNotificacoesPendentes = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('notificacoes')
//         .select('*')
//         .eq('status_notificacao', 'enviada');

//       if (error) throw error;

//       console.log("Notificações retornadas:", data);  // Verifique o que é retornado

//       // Garante que data seja sempre um array
//       setNotificacoes(Array.isArray(data) ? data : []);
//     } catch (error) {
//       setError('Erro ao buscar notificações');
//       console.error("Erro ao buscar notificações:", error);
//     }
//   };

//   // Usar o useEffect para buscar notificações ao carregar o componente
//   useEffect(() => {
//     buscarNotificacoesPendentes();
//   }, []);

//   return (
//     <div>
//       <h2>Notificações</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {notificacoes.length > 0 ? (
//         // <ul>
//         //   {notificacoes.map((notificacao) => {
//         //     console.log("Notificação:", notificacao);  // Verificando o formato
//         //     return (
//         //       <li key={Notificações.id_notificacao} className="notificacao">
//         //         <h4>{notificacao.tipo_notificacao || 'Tipo não disponível'}</h4>
//         //         <p>Data de envio: {notificacao.data_envio ? new Date(notificacao.data_envio).toLocaleString() : 'Data não disponível'}</p>
//         //         <p>ID do incidente: {notificacao.id_incidente || 'ID não disponível'}</p>
//         //         <p>Status: {notificacao.status_notificacao || 'Status não disponível'}</p>
//         //       </li>
//         //     );
//         //   })}
//         // </ul>
//       ) : (
//         <p>Sem notificações no momento</p>
//       )}
//     </div>
//   );
// };

// export default Notification;
