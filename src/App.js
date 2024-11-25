import logo from './logo.svg';
import './App.css';


import React, { useState } from "react";

const App = () => {
  // Estado inicial de los datos
  const [data] = useState({
      "dominio": "Procesamiento",
      "business-areas": [
        {
          "business-area":"Valor agregado",
          "codigo-ba":"VAS",
          "business-domains": [
            {
              "business-domain":"Loyalty",
              "codigo-bd":"LOY",
              "service-domains": [
                {
                  "service-domain":"redemption",
                  "codigo-sd":"red"

                },
                {
                  "service-domain":"validate",
                  "codigo-sd":"val"

                }
              ]
            },
            {
              "business-domain":"Marca Cerrada",
              "codigo-bd":"MACE",
              "service-domains": [
                {
                  "service-domain":"redemption",
                  "codigo-sd":"red"

                },
                {
                  "service-domain":"validate",
                  "codigo-sd":"val"

                }
              ]
            }
          ]
        },
        {
          "business-area":"Venta No Presente",
          "codigo-ba":"VNP",
          "business-domains": [
            {
              "business-domain":"Visa Direct",
              "codigo-bd":"VDR",
              "service-domains": [
                {
                  "service-domain":"authorize",
                  "codigo-sd":"AUT"

                },
                {
                  "service-domain":"validate",
                  "codigo-sd":"VAL"

                }
              ]
            },
            {
              "business-domain":"Geminis",
              "codigo-bd":"GEM",
              "service-domains": [
                {
                  "service-domain":"transaccion",
                  "codigo-sd":"TRX"

                },
                {
                  "service-domain":"monitoring",
                  "codigo-sd":"MON"

                }
              ]
            }
          ]
        },
        {
          "business-area":"Instant Payments",
          "codigo-ba":"INP",
          "business-domains": []
        },
        {
          "business-area":"Transversales",
          "codigo-ba":"TRV",
          "business-domains": []
        },
        {
          "business-area":"Soluciones Multiagente",
          "codigo-ba":"SML",
          "business-domains": [
            {
              "business-domain":"Flow Management",
              "codigo-bd":"FLW",
              "service-domains": [
                {
                  "service-domain":"redemption",
                  "codigo-sd":"red"

                },
                {
                  "service-domain":"monitoring",
                  "codigo-sd":"MON"

                }
              ]
            }
          ]
        }
      ]
    });

  const [selectedBusinessArea, setSelectedBusinessArea] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [apiType, setApiType] = useState("");
  const [apiVersion, setApiVersion] = useState("");
  const [method, setMethod] = useState("GET");
  const [actionTerm, setActionTerm] = useState("Retrieve");
  const [behaviorQualifier, setBehaviorQualifier] = useState("");

  // Obtener dominios y servicios según el área seleccionada
  const businessArea = data["business-areas"].find(
    (area) => area["business-area"] === selectedBusinessArea
  );

  const businessDomains = businessArea?.["business-domains"] || [];
  const selectedBusinessDomain = businessDomains.find(
    (domain) => domain["business-domain"] === selectedDomain
  );

  const serviceDomains = selectedBusinessDomain?.["service-domains"] || [];

  // Opciones dinámicas para Action Term según Method HTTP
  const actionTermsByMethod = {
    GET: ["retrieve", "notify"],
    POST: ["create", "initiate", "register", "evaluate", "provide"],
  };

  const availableActionTerms = actionTermsByMethod[method] || [];

  // Manejo del evento para generar API
  const handleGenerateAPI = () => {
    const apiData = {
      "API Type": apiType,
      "API Version": apiVersion,
      "Method HTTP": method,
      "Action Term": actionTerm,
      "Behavior Qualifier": behaviorQualifier,
      "Business Area": selectedBusinessArea,
      "Business Domain": selectedDomain,
      "Service Domain": selectedService,
    };
    console.log("Generated API Data: ", apiData);
    alert("API Generated! Check the console.");
  };

  return (
    <div className="container">
      <h1>Semantic API (BIAN v12) - Generator</h1>
      <div>
        <label>BIAN Business Area:</label>
        <select
          value={selectedBusinessArea}
          onChange={(e) => {
            setSelectedBusinessArea(e.target.value);
            setSelectedDomain("");
            setSelectedService("");
          }}
        >
          <option value="">Select Business Area</option>
          {data["business-areas"].map((area) => (
            <option key={area["codigo-ba"]} value={area["business-area"]}>
              {area["business-area"]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>BIAN Business Domain:</label>
        <select
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value);
            setSelectedService("");
          }}
          disabled={!selectedBusinessArea}
        >
          <option value="">Select Business Domain</option>
          {businessDomains.map((domain) => (
            <option key={domain["codigo-bd"]} value={domain["business-domain"]}>
              {domain["business-domain"]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>BIAN Service Domain:</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          disabled={!selectedDomain}
        >
          <option value="">Select Service Domain</option>
          {serviceDomains.map((service) => (
            <option key={service["codigo-sd"]} value={service["service-domain"]}>
              {service["service-domain"]}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>API Type:</label>
        <select value={apiType} onChange={(e) => setApiType(e.target.value)}>
          <option value="">Select API Type</option>
          <option value="channel">Channel</option>
          <option value="business">Business</option>
          <option value="support">Support</option>
          <option value="workload">Workload</option>
        </select>
      </div>
      <div>
        <label>API Version:</label>
        <select value={apiVersion} onChange={(e) => setApiVersion(e.target.value)}>
          <option value="">Select API Version</option>
          <option value="v1.0">v1.0</option>
          <option value="v2.0">v2.0</option>
          <option value="v3.0">v3.0</option>
        </select>
      </div>
      <div>
        <label>Method HTTP:</label>
        <select value={method} onChange={(e) =>{ setMethod(e.target.value); setActionTerm("");}}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </div>
      <div>
        <label>Action Term:</label>
        <select
          value={actionTerm}
          onChange={(e) => setActionTerm(e.target.value)}
	  disabled={!method}
        >
<option value="">Select Action Term</option>
          {availableActionTerms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Behavior Qualifier:</label>
        <input
          type="text"
          value={behaviorQualifier}
          onChange={(e) => setBehaviorQualifier(e.target.value)}
        />
      </div>
      <button onClick={handleGenerateAPI}>Generate BIAN Semantic API</button>
    </div>
  );
};
export default App;
