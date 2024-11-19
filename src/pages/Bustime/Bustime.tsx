import { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import '../../styles/Bustime.css';

interface HorarioSemanal {
  linha_nome: string;
}

function Bustime() {
  const [horarios, setHorarios] = useState<HorarioSemanal[]>([]);
  const [filteredHorarios, setFilteredHorarios] = useState<HorarioSemanal[]>([]);
  const [searchLinha, setSearchLinha] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const fetchHorarios = async () => {
    try {
      console.log('Iniciando busca de horários...');

      const { data, error } = await supabase
        .from('horarios_semanais')
        .select(`
          linhas (nome)
        `);

      if (error) {
        console.error('Erro ao buscar horários:', error);
        setError(`Erro ao buscar horários: ${error.message}`);
        return;
      }

      console.log('Dados retornados:', data);

      if (data && data.length > 0) {
        const formattedData: HorarioSemanal[] = data.map((item: any) => ({
          linha_nome: item.linhas ? item.linhas.nome : 'N/A',
        }));

        // Ordenando os dados em ordem alfabética pelo nome da linha
        const sortedData = formattedData.sort((a, b) =>
          a.linha_nome.localeCompare(b.linha_nome)
        );

        setHorarios(sortedData);
        setFilteredHorarios(sortedData);
        setError(null);
      } else {
        console.warn('Nenhum dado encontrado.');
        setHorarios([]);
        setFilteredHorarios([]);
      }
    } catch (err) {
      console.error('Erro geral na consulta:', err);
      setError(`Erro geral na consulta: ${(err as Error).message}`);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchLinha(value);

    if (value === '') {
      setFilteredHorarios(horarios);
    } else {
      const filtered = horarios.filter((horario) =>
        horario.linha_nome.toLowerCase().includes(value)
      );
      setFilteredHorarios(filtered);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  return (
    <section className="Times">
      <h1 id="horario">Linhas de Ônibus</h1>

      {/* Campo de busca */}
      <input
        type="text"
        placeholder="Buscar por nome da linha..."
        value={searchLinha}
        onChange={handleSearch}
        className="search-input"
      />

      {/* Mensagem de erro */}
      {error && <div className="error-message">{error}</div>}

      {/* Caso nenhum dado seja encontrado */}
      {filteredHorarios.length === 0 && !error && <p>Nenhum dado encontrado.</p>}

      {/* Renderiza os horários em formato de tabela */}
      {filteredHorarios.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Linha</th>
            </tr>
          </thead>
          <tbody>
            {filteredHorarios.map((horario, index) => (
              <tr key={index}>
                <td>{horario.linha_nome}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Bustime;
