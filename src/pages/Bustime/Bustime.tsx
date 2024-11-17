import { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import '../../styles/Bustime.css';

interface HorarioOnibus {
  horario_partida: string;
  horario_chegada: string;
  linha_id: {
    nome: string;
  };
  parada_inicio: {
    nome: string;
  };
  parada_fim: {
    nome: string;
  };
}

function Bustime() {
  const [horarios, setHorarios] = useState<HorarioOnibus[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchHorarios = async () => {
    try {
      // Ajuste na consulta para buscar os dados relacionados corretamente
      const { data, error } = await supabase
        .from('horarios_onibus')
        .select(`
          horario_partida,
          horario_chegada,
          linha_id:linhas (
            nome
          ),
          parada_inicio:paradas!horarios_onibus_parada_inicio_fkey (
            nome
          ),
          parada_fim:paradas!horarios_onibus_parada_fim_fkey (
            nome
          )
        `);

      console.log('Dados retornados:', data); // Verifica os dados

      if (error) {
        console.error('Erro ao buscar horários:', error);
        setError(`Erro ao buscar horários: ${error.message}`);
        return; // Sai da função em caso de erro
      }

      if (data) {
        // Corrigir o tipo de dado retornado do Supabase
        const formattedData: HorarioOnibus[] = data.map((item: any) => ({
          horario_partida: item.horario_partida,
          horario_chegada: item.horario_chegada,
          linha_id: item.linha_id ? { nome: item.linha_id.nome } : { nome: 'N/A' }, // Garantindo que seja um objeto
          parada_inicio: item.parada_inicio ? { nome: item.parada_inicio.nome } : { nome: 'N/A' },
          parada_fim: item.parada_fim ? { nome: item.parada_fim.nome } : { nome: 'N/A' },
        }));

        setHorarios(formattedData);
        setError(null); // Limpa o erro caso os dados sejam retornados
      }
    } catch (err) {
      console.error('Erro geral na consulta:', err);
      setError(`Erro geral na consulta: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []); // Garante que o efeito só rode uma vez

  return (
    <section className="Times">
      <h1 id="horario">Horário de Ônibus</h1>

      {/* Mensagem de erro */}
      {error && <div className="error-message">{error}</div>}

      {/* Caso nenhum dado seja encontrado */}
      {horarios.length === 0 && !error && <p>Nenhum dado encontrado.</p>}

      {/* Renderiza os horários em formato de tabela */}
      <table>
        <thead>
          <tr>
            <th>Linha</th>
            <th>Partida</th>
            <th>Chegada</th>
            <th>Parada Inicial</th>
            <th>Parada Final</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index}>
              {/* Exibe o nome da linha corretamente */}
              <td>{horario.linha_id?.nome || 'N/A'}</td>
              <td>{horario.horario_partida}</td>
              <td>{horario.horario_chegada}</td>
              <td>{horario.parada_inicio?.nome || 'N/A'}</td>
              <td>{horario.parada_fim?.nome || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Bustime;
