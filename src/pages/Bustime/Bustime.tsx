import { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import '../../styles/Bustime.css';

interface HorarioSemanal {
  dia_semana: string;
  horario_partida: string;
  horario_chegada: string;
  linha_nome: string;
  parada_inicio_nome: string;
  parada_fim_nome: string;
}

function Bustime() {
  const [horarios, setHorarios] = useState<HorarioSemanal[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchHorarios = async () => {
    try {
      console.log('Iniciando busca de horários...');

      const { data, error } = await supabase
        .from('horarios_semanais')
        .select(`
          dia_semana,
          horario,
          linhas (nome),
          parada_inicio:paradas!fk_parada_inicio (nome),
          parada_fim:paradas!fk_parada_fim (nome)
        `);

      if (error) {
        console.error('Erro ao buscar horários:', error);
        setError(`Erro ao buscar horários: ${error.message}`);
        return;
      }

      console.log('Dados retornados:', data);

      if (data && data.length > 0) {
        const formattedData: HorarioSemanal[] = data.map((item: any) => ({
          dia_semana: item.dia_semana || 'N/A',
          horario_partida: item.horario || 'N/A', // Usando 'item.horario' diretamente
          horario_chegada: 'N/A', // Atualize isso conforme necessário
          linha_nome: item.linhas ? item.linhas.nome : 'N/A',
          parada_inicio_nome: item.parada_inicio ? item.parada_inicio.nome : 'N/A',
          parada_fim_nome: item.parada_fim ? item.parada_fim.nome : 'N/A',
        }));

        setHorarios(formattedData);
        setError(null);
      } else {
        console.warn('Nenhum dado encontrado.');
        setHorarios([]);
      }
    } catch (err) {
      console.error('Erro geral na consulta:', err);
      setError(`Erro geral na consulta: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <section className="Times">
      <h1 id="horario">Horário de Ônibus</h1>

      {/* Mensagem de erro */}
      {error && <div className="error-message">{error}</div>}

      {/* Caso nenhum dado seja encontrado */}
      {horarios.length === 0 && !error && <p>Nenhum dado encontrado.</p>}

      {/* Renderiza os horários em formato de tabela */}
      {horarios.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Dia da Semana</th>
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
                <td>{horario.dia_semana}</td>
                <td>{horario.linha_nome}</td>
                <td>{horario.horario_partida}</td>
                <td>{horario.horario_chegada}</td>
                <td>{horario.parada_inicio_nome}</td>
                <td>{horario.parada_fim_nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Bustime;