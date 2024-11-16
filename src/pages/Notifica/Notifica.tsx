import React, { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import '../../styles/Notifica.css';

// Define os tipos de dados
interface Notificacao {
    id: number;
    linha: string;
    mensagem: string;
    tipo: string;
    data_envio: string;
}

const Notification: React.FC = () => {
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Função para buscar notificações pendentes
    const buscarNotificacoesPendentes = async () => {
        try {
            const { data, error } = await supabase
                .from('notificacoes')
                .select('id, linha, mensagem, tipo, data_envio')
                .order('data_envio', { ascending: false }); // Ordena por data mais recente

            if (error) {
                console.error('Erro retornado pelo Supabase:', error.message, error.details);
                throw new Error(`Erro na consulta: ${error.message}`);
            }

            setNotificacoes(data || []);
        } catch (error: any) {
            setError(error.message || 'Erro desconhecido ao buscar notificações.');
            console.error('Erro capturado:', error);
        }
    };

    // Configurar a assinatura do realtime
    useEffect(() => {
        // Função inicial para buscar notificações existentes
        buscarNotificacoesPendentes();

        // Criar uma assinatura para ouvir mudanças na tabela "notificacoes"
        const subscription = supabase
            .channel('notificacoes-changes') // Nome do canal
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notificacoes' },
                (payload) => {
                    console.log('Mudança detectada:', payload);
                    buscarNotificacoesPendentes(); // Atualiza a lista ao detectar mudanças
                }
            )
            .subscribe();

        // Limpa a assinatura ao desmontar o componente
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []); // Executa apenas uma vez ao carregar o componente

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
                        <div className='notititle'>{notificacao.linha}</div>
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
