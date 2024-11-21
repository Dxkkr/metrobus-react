import { useEffect, useState } from 'react';
import { supabase } from '../../client/supabaseClient';
import '../../styles/Bustime.css';
import fotoOnibus from '../../images/images.jpg'
interface HorarioSemanal {
  horario_partida: string;
  horario_chegada: string;
  linha_nome: string;
  parada_inicio_nome: string;
  parada_fim_nome: string;
}

function Bustime() {
  const [horarios, setHorarios] = useState<HorarioSemanal[]>([]);
  const [selectedLinha, setSelectedLinha] = useState<string | null>(null); // Linha selecionada
  const [modalHorarios, setModalHorarios] = useState<HorarioSemanal[]>([]); // Horários da linha no modal
  const [error, setError] = useState<string | null>(null);

  const fetchHorarios = async () => {
    try {
      const { data, error } = await supabase
        .from('horarios_semanais')
        .select(`
          horario,
          linhas (nome),
          parada_inicio:paradas!fk_parada_inicio (nome),
          parada_fim:paradas!fk_parada_fim (nome)
        `);

      if (error) {
        setError(`Erro ao buscar horários: ${error.message}`);
        return;
      }

      if (data) {
        const formattedData: HorarioSemanal[] = data.map((item: any) => ({
          horario_partida: item.horario || 'N/A',
          horario_chegada: 'N/A',
          linha_nome: item.linhas ? item.linhas.nome : 'N/A',
          parada_inicio_nome: item.parada_inicio ? item.parada_inicio.nome : 'N/A',
          parada_fim_nome: item.parada_fim ? item.parada_fim.nome : 'N/A',
        }));

        // Ordenando os dados alfabeticamente pelo nome da linha
        const sortedData = formattedData.sort((a, b) =>
          a.linha_nome.localeCompare(b.linha_nome)
        );

        setHorarios(sortedData);
        setError(null);
      }
    } catch (err) {
      setError(`Erro geral na consulta: ${(err as Error).message}`);
    }
  };

  useEffect(() => {
    fetchHorarios();
  }, []);

  const openModal = (linhaNome: string) => {
    // Filtra os horários da linha selecionada e abre o modal
    const horariosDaLinha = horarios.filter((horario) => horario.linha_nome === linhaNome);
    setModalHorarios(horariosDaLinha);
    setSelectedLinha(linhaNome);
  };

  const closeModal = () => {
    setSelectedLinha(null);
    setModalHorarios([]);
  };

  return (
    <section className="Times">
      <div className="image">
      </div>
      <h1 id="horario">Horário de Ônibus</h1>
        <img className='bus_photo' src={fotoOnibus}/>

      {/* Mensagem de erro */}
      {error && <div className="error-message">{error}</div>}

      {/* Renderiza a tabela de linhas */}
      <table>
        <thead>
          <tr>
            <th>Linha</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario, index) => (
            <tr key={index} onClick={() => openModal(horario.linha_nome)} className="clickable-row">
              <td>{horario.linha_nome}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedLinha && (

        <div className="modal-overlay">
          <div className="modal-content">
            <div className="tools">
              <div className="circle">
                <span className="red box"></span>
              </div>
              <div className="circle">
                <span className="yellow box"></span>
              </div>
              <div className="circle">
                <span className="green box"></span>
              </div>
            </div>
            <div className="card__content">
            </div>

            <h2 className='nome-linha'>Linha: {selectedLinha}</h2>
            <button onClick={closeModal} className="close-modal-btn"><i className="fa-regular fa-circle-xmark"></i></button>
            <table>
              <thead>
                <tr>
                  <th>Partida</th>
                  <th>Chegada</th>
                  <th>Parada Inicial</th>
                  <th>Parada Final</th>
                </tr>
              </thead>
              <tbody>
                {modalHorarios.map((horario, index) => (
                  <tr key={index}>
                    <td>{horario.horario_partida}</td>
                    <td>{horario.horario_chegada}</td>
                    <td>{horario.parada_inicio_nome}</td>
                    <td>{horario.parada_fim_nome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}

export default Bustime;
