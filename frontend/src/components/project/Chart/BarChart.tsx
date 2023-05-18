import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

interface BarChartProps {
  data: number[];
  labels: string[];
}

export default function BarChart({ data, labels }: BarChartProps) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  Chart.defaults.font.size = 13;

  useEffect(() => {
    if (chartRef.current) {
      const myChart = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          //차트 전체의 datasets -> 범례
          datasets: [
            {
              label: "아이템 빌드 수",
              data: data,
              //항목별로 다르게 색을 지정해주기
              //위한 색 배열(미리 만들어놓고 색 다르게 보이게 함)
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#5A9A54",
                "#DE4D4D",
                "#264DD2",
              ],
              borderWidth: 1,
              // 바의 크기를 조절하는 속성
              barThickness: 30,
            },
          ],
        },
        //차트 커스텀 하기 위한 options 설정들
        options: {
          //범례 가리기
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            //x축 안 보이게 하기
            x: {
              display: false,
            },
            y: {
              beginAtZero: true,
            },
          },

          //가로 차트로 변경
          indexAxis: "y",
          //차트 크기 변경 시 자동 조정
          responsive: true,
          //가로 세로 비율 유지 설정
          maintainAspectRatio: true,
        },
      });
      return () => {
        // clean up 함수
        myChart.destroy();
      };
    }
  }, [chartRef]);

  return <canvas ref={chartRef} />;
}
