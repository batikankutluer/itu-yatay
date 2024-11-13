"use client";

import React, { useState } from "react";
import matches from "./matches.json";

export default function App({ version }: { version: string }) {
  const [userYKS, setUserYKS] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [termSelection, setTermSelection] = useState("0");
  const [showResults, setShowResults] = useState(false);
  const [onlyEnglish, setOnlyEnglish] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setResults(matches);
    setShowResults(true);
  };

  function handleOnlyEnglish(e: React.MouseEvent) {
    e.preventDefault();
    setOnlyEnglish(!onlyEnglish);
    if (!onlyEnglish) return setResults(matches);
    setResults(matches.filter((program) => program.sadeceIngilizceVar));
  }

  function handleSelection(e: any) {
    e.preventDefault();
    setTermSelection(e.target.value);
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-slate-600 min-h-screen">
      <h1 className="text-4xl font-bold font-mono mb-6 text-amber-400 text-center select-none">
        İTÜ Yatay - GPA Aracı
      </h1>
      <form
        onSubmit={handleSubmit}
        className="mb-8 flex justify-center bg-slate-700 rounded-lg shadow-md p-12 select-none"
      >
        <div className="min-w-56 flex flex-col text-slate-200 font-bold">
          <p>YKS Puanın:</p>
          <input
            type="number"
            min="0"
            max="560"
            value={userYKS}
            onChange={(e) => setUserYKS(e.target.value)}
            placeholder="YKS puanınızı giriniz."
            className="w-full border text-black border-gray-300 rounded px-4 py-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="flex justify-between py-2">
            <div className="flex items-center">
              <p>Girdiğin Sene:</p>
            </div>
            <select
              onChange={(e) => setSelectedYear(e.target.value)}
              className="text-black p-2 rounded-sm"
              required
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-slate-800 hover:bg-amber-700 hover:text-amber-400 text-slate-300 font-bold px-6 py-2 rounded transition duration-300"
            disabled={
              userYKS === "" || Number(userYKS) < 0 || Number(userYKS) > 560
            }
          >
            Sonuçları Al
          </button>
        </div>
      </form>
      {showResults ? (
        <div>
          <div className="overflow-x-auto bg-slate-600 rounded-lg shadow-md">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-700 border-2 border-slate-400">
                  <th className="flex flex-col lg:flex-row justify-between text-center py-3 px-4 lg:text-left bg-slate-800 text-slate-200">
                    <div className="lg:flex lg:justify-center lg:items-center pb-2 lg:pb-0">
                      Program
                    </div>
                    <button
                      onClick={handleOnlyEnglish}
                      className={`bg-slate-700 p-1 px-2 ${
                        onlyEnglish ? "text-amber-800" : "text-amber-200"
                      } hover:text-amber-400 active:text-amber-300 rounded-md`}
                    >
                      Sadece İngilizce
                    </button>
                  </th>
                  <th className="p-2 lg:p-0">
                    <select
                      className="text-center bg-slate-500 text-amber-300 hover:text-amber-200 hover:cursor-pointer shadow-sm rounded-md p-3"
                      onChange={(e) => handleSelection(e)}
                    >
                      <option value="3" className="text-amber-300">
                        3. Yarıyıl
                      </option>
                      <option value="5" className="text-amber-400">
                        5. Yarıyıl
                      </option>
                      <option
                        value="0"
                        className="text-slate-200 text-center"
                        selected
                      >
                        Hepsi
                      </option>
                    </select>
                  </th>
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
                      selectedYear={selectedYear}
                      program={program}
                      yilAdi="3.Yarıyıl"
                      userYKS={userYKS}
                      termSelection={termSelection}
                    />
                    <Row
                      key={program?.programAdi + "5.Yarıyıl" + index}
                      selectedYear={selectedYear}
                      program={program}
                      yilAdi="5.Yarıyıl"
                      userYKS={userYKS}
                      termSelection={termSelection}
                    />
                  </>
                );
              })}
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-slate-800 rounded-lg shadow-md p-4 flex flex-col items-center select-none">
          <h1 className="text-red-600 text-center text-5xl pb-2">Dikkat!</h1>
          <p className="text-amber-200 text-center text-lg p-2">
            Bu hesaplayıcı prototip aşamasındadır. Bazı veriler hatalı veya
            yanıltıcı olabilir, son kontrollerinizi kendiniz yapınız.
          </p>
          <div className="grid grid-cols-2 select-none">
            <p className="text-slate-300 text-center text-lg p-2">
              Geri bildirim için:{" "}
              <a href="mailto:60034174+batikankutluer@users.noreply.github.com?subject=Sitenizde bir hata buldum.&body=Merhaba Batıkan, yazdığın sitede (itu-yatay.vercel.app) şöyle bir hata buldum:">
                <button className="p-2 px-3 bg-slate-700 text-slate-300 hover:text-amber-400 text-sm rounded-xl">
                  Mail için Tıkla!
                </button>
              </a>
            </p>
            <div className="flex items-center">
              <p className="p-2 select-none text-slate-400 shadow-sm rounded-md bg-slate-900 shadow-slate-900 text-sm">
                İTÜ Yatay Geçiş - GPA Hesaplama Aracı {version}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({
  program,
  yilAdi,
  userYKS,
  selectedYear,
  termSelection,
}: {
  program: any;
  yilAdi: string;
  userYKS: string;
  selectedYear: string;
  termSelection: string;
}) {
  let yil = program?.yil[yilAdi];

  let kontenjan = yil?.kontenjan || "-";
  let yerlesen = yil?.yerlesen || "-";
  let maxSkor = yil?.maxSkor || "-";
  let minSkor = yil?.minSkor || "-";
  let yksYillar = program?.yksYillar || [];

  let yksTabanPuan =
    program?.yksTabanPuan[
      yksYillar.findIndex((puan: string) => puan == selectedYear)
    ];

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
    return (
      <RowIngilizce
        selectedYear={selectedYear}
        program={program}
        yilAdi={yilAdi}
        userYKS={userYKS}
        termSelection={termSelection}
      />
    );
  return (
    <RowTemplate
      programAdi={program.programAdi}
      yilAdi={yilAdi}
      kontenjan={kontenjan}
      yerlesen={yerlesen}
      minGPA={minGPA}
      maxGPA={maxGPA}
      isIngilizce={false}
      termSelection={termSelection}
    />
  );
}

function RowIngilizce({
  program,
  yilAdi,
  userYKS,
  selectedYear,
  termSelection,
}: {
  program: any;
  yilAdi: string;
  userYKS: string;
  selectedYear: string;
  termSelection: string;
}) {
  let yil = program?.yil[yilAdi];

  let kontenjan = yil?.ingilizce?.kontenjan || "-";
  let yerlesen = yil?.ingilizce?.yerlesen || "-";
  let maxSkor = yil?.ingilizce?.maxSkor || "-";
  let minSkor = yil?.ingilizce?.minSkor || "-";
  let yksYillar = program?.yksYillar || [];

  let ingilizceYksTaban =
    program?.ingilizceYksPuan[
      yksYillar.findIndex((puan: string) => puan == selectedYear)
    ];

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
      termSelection={termSelection}
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
  termSelection,
  isIngilizce,
}: {
  programAdi: string;
  yilAdi: string;
  kontenjan: string;
  yerlesen: string;
  minGPA: string;
  maxGPA: string;
  termSelection: string;
  isIngilizce: boolean;
}) {
  if (minGPA != "-") minGPA = minGPA.toString().slice(0, 4);
  if (maxGPA != "-") maxGPA = maxGPA.toString().slice(0, 4);

  if (kontenjan == "0" || kontenjan == "-") minGPA = maxGPA = "Açılmamış...";
  if (kontenjan > yerlesen) minGPA = maxGPA = "Yerleşen yok.";

  if (Number(minGPA) > 4) return;
  if (Number(maxGPA) > 4) maxGPA = "4>";

  if (termSelection != "0") if (yilAdi != `${termSelection}.Yarıyıl`) return;
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
