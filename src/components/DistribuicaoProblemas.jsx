import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import setoresData from "../data/distribuicaoReclamacoes.json"; // <-- Importa dados externos

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function DistribuicaoProblemas() {
  const { distribucaoSetores, distribuiuSetores, distribuicaoSetores } = setoresData;

  // Compatibilidade caso você escreva o nome errado no JSON
  const data = distribuicaoSetores || distribucaoSetores || distribuiuSetores;

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "auto",
        width: "600px",
        minHeight: "400px"
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Distribuição de Problemas por Setor</h3>

      <PieChart width={600} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
