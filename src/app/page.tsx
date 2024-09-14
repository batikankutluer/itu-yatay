"use client";

import { useState } from "react";
import matches from "./matches.json";

export default function Home() {
  const [userYKS, setUserYKS] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setResults(matches);
    setShowResults(true);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-600 min-h-screen">
      <h1 className="text-4xl font-bold font-mono mb-6 text-amber-400 text-center">
        İTÜ GPA Hesaplama
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex justify-center bg-slate-700 rounded-lg shadow-md p-12"
      >
        <input
          type="number"
          min="0"
          max="560"
          value={userYKS}
          onChange={(e) => setUserYKS(e.target.value)}
          placeholder="YKS puanınızı giriniz."
          className="w-56 border text-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-slate-800 hover:bg-amber-700 hover:text-amber-400 text-slate-300 font-bold px-6 py-2 rounded transition duration-300"
          disabled={
            userYKS === "" || Number(userYKS) < 0 || Number(userYKS) > 560
          }
        >
          Process
        </button>
      </form>
      {showResults ? (
        <div>
          <div className="overflow-x-auto bg-slate-600 rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 border-2 border-slate-400">
                  <th className="py-3 px-4 text-left bg-slate-800 text-slate-200">
                    Program
                  </th>
                  <th className="py-3 px-4 text-center">Dönem</th>
                  <th className="py-3 px-4 text-center">Kontenjan</th>
                  <th className="py-3 px-4 text-center">Yerleşen</th>
                  <th className="py-3 px-4 text-center">Max GPA</th>
                  <th className="py-3 px-4 text-center">Min GPA</th>
                </tr>
              </thead>

              {results.map((program, index) => {
                if (program?.fakulte) return;
                return (
                  <>
                    <Row
                      key={program?.programAdi + "3.Yarıyıl" + index}
                      program={program}
                      yilAdi="3.Yarıyıl"
                      userYKS={userYKS}
                    />
                    <Row
                      key={program?.programAdi + "5.Yarıyıl" + index}
                      program={program}
                      yilAdi="5.Yarıyıl"
                      userYKS={userYKS}
                    />
                  </>
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg shadow-md p-4 flex flex-col items-center">
          <h1 className="text-red-600 text-center text-5xl pb-2">Dikkat!</h1>
          <p className="text-amber-200 text-center text-lg p-2">
            Bu hesaplayıcı prototip aşamasındadır. Bazı veriler hatalı veya
            yanıltıcı olabilir, son kontrollerinizi kendiniz yapınız.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({
  program,
  yilAdi,
  userYKS,
}: {
  program: any;
  yilAdi: string;
  userYKS: string;
}) {
  let yil = program?.yil[yilAdi];

  let kontenjan = yil?.kontenjan || "-";
  let yerlesen = yil?.yerlesen || "-";
  let maxSkor = yil?.maxSkor || "-";
  let minSkor = yil?.minSkor || "-";

  let yksTabanPuan = program?.yksTabanPuan.replace(",", ".");

  let minGPA: any = "-";
  let maxGPA: any = "-";

  if (program.programAdi == "Kontrol ve Otomasyon Mühendisliği")
    yksTabanPuan = 524.44;
  if (program.programAdi == "Meteoroloji Mühendisliği") yksTabanPuan = 432.85;

  if (minSkor !== "-" && yksTabanPuan !== "-") {
    minGPA =
      (minSkor * yksTabanPuan - Number(userYKS) * 0.4) / (yksTabanPuan * 0.15);
  }

  if (maxSkor !== "-" && yksTabanPuan !== "-") {
    maxGPA =
      (maxSkor * yksTabanPuan - Number(userYKS) * 0.4) / (yksTabanPuan * 0.15);
  }

  if (program.programAdi == "Maden Mühendisliği") {
    console.log(minGPA, maxGPA);
    console.log(minSkor, maxSkor);
    console.log(minSkor !== "-", yksTabanPuan !== "-");
  }

  if (program?.sadeceIngilizceVar)
    return <RowIngilizce program={program} yilAdi={yilAdi} userYKS={userYKS} />;
  return (
    <RowTemplate
      programAdi={program.programAdi}
      yilAdi={yilAdi}
      kontenjan={kontenjan}
      yerlesen={yerlesen}
      minGPA={minGPA}
      maxGPA={maxGPA}
      isIngilizce={false}
    />
  );
}

function RowIngilizce({
  program,
  yilAdi,
  userYKS,
}: {
  program: any;
  yilAdi: string;
  userYKS: string;
}) {
  let yil = program?.yil[yilAdi];

  let kontenjan = yil?.ingilizce?.kontenjan || "-";
  let yerlesen = yil?.ingilizce?.yerlesen || "-";
  let maxSkor = yil?.ingilizce?.maxSkor || "-";
  let minSkor = yil?.ingilizce?.minSkor || "-";

  let ingilizceYksTaban = program?.ingilizceYksPuani.replace(",", ".");

  let minGPA: any = "-";
  let maxGPA: any = "-";

  if (minSkor !== "-" && ingilizceYksTaban !== "-") {
    minGPA =
      (minSkor * ingilizceYksTaban - Number(userYKS) * 0.4) /
      (ingilizceYksTaban * 0.15);
  }

  if (maxSkor !== "-" && ingilizceYksTaban !== "-") {
    maxGPA =
      (maxSkor * ingilizceYksTaban - Number(userYKS) * 0.4) /
      (ingilizceYksTaban * 0.15);
  }

  return (
    <RowTemplate
      programAdi={program.programAdi}
      yilAdi={yilAdi}
      kontenjan={kontenjan}
      yerlesen={yerlesen}
      minGPA={minGPA}
      maxGPA={maxGPA}
      isIngilizce={true}
    />
  );
}

function RowTemplate({
  programAdi,
  yilAdi,
  kontenjan,
  yerlesen,
  minGPA,
  maxGPA,
  isIngilizce,
}: {
  programAdi: string;
  yilAdi: string;
  kontenjan: string;
  yerlesen: string;
  minGPA: string;
  maxGPA: string;
  isIngilizce: boolean;
}) {
  if (minGPA == "-") minGPA = "Girersiniz";
  else minGPA = minGPA.toString().slice(0, 4);
  if (maxGPA == "-") maxGPA = "Girersiniz";
  else maxGPA = maxGPA.toString().slice(0, 4);

  if (Number(minGPA) > 4) minGPA = "4>";
  if (Number(maxGPA) > 4) maxGPA = "4>";

  return (
    <tbody className="text-gray-600">
      <tr className="bg-gray-100 border-2 border-slate-400">
        <td className="text-gray-200 font-semibold bg-slate-600 p-2">
          {programAdi} {isIngilizce ? "(İngilizce)" : ""}
        </td>
        <td className="text-gray-800 bg-slate-300 text-center">{yilAdi}</td>
        <td className="text-gray-800 bg-slate-300 text-center">{kontenjan}</td>
        <td className="text-gray-800 bg-slate-300 text-center">{yerlesen}</td>
        <td className="text-gray-800 bg-slate-300 text-center">{maxGPA}</td>
        <td className="text-gray-800 bg-slate-300 text-center">{minGPA}</td>
      </tr>
    </tbody>
  );
}
