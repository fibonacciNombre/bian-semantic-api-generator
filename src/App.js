import logo from './logo.svg';

import React, { useState } from "react";
import "./App.css";

const App = () => {
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
  const [actionTerm, setActionTerm] = useState("");
  const [behaviorQualifier, setBehaviorQualifier] = useState("");
  const [generatedData, setGeneratedData] = useState({});

  const actionTermsByMethod = {
    GET: ["retrieve", "notify"],
    POST: ["create", "initiate", "register", "evaluate", "provide"],
  };

  const availableActionTerms = actionTermsByMethod[method] || [];

  const handleGenerateAPI = () => {
    const apiBasePath = `/${selectedService?.toLowerCase().replace(/\s/g, "-")}/v${apiVersion}`;
    const apiPathOperation = `/${behaviorQualifier?.toLowerCase().replace(/\s/g, "-")}/${actionTerm?.toLowerCase()}`;
    const apiURI = `${apiBasePath}${apiPathOperation}`;
    const objectRequest = `${actionTerm?.charAt(0).toUpperCase() + actionTerm?.slice(1)}${behaviorQualifier
      ?.split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")}`;
    const objectResponse = `${objectRequest}Response`;

    setGeneratedData({
      "API Type": apiType,
      "API Product Name": selectedDomain,
      "API Name": selectedService,
      "API Base Path": apiBasePath,
      "API Path Operation": apiPathOperation,
      "API URI BIAN": apiURI,
      "Object Request": objectRequest,
      "Object Response": objectResponse,
    });

    console.log("Generated Data:", {
      "API Type": apiType,
      "API Product Name": selectedDomain,
      "API Name": selectedService,
      "API Base Path": apiBasePath,
      "API Path Operation": apiPathOperation,
      "API URI BIAN": apiURI,
      "Object Request": objectRequest,
      "Object Response": objectResponse,
    });
  };

  const handleDownloadYAML = () => {
    if (!Object.keys(generatedData).length) {
      alert("Por favor, genera la API primero antes de descargar el YAML.");
      return;
    }
  
    const yamlContent = `
  openapi: 3.0.1
  info:
    title: ${generatedData["API Name"]}
    description: Semantic API Specification for ${generatedData["API Name"]}
    version: ${apiVersion}
  paths:
    ${generatedData["API Path Operation"]}:
      ${method.toLowerCase()}:
        summary: ${actionTerm} ${behaviorQualifier}
        responses:
          '200':
            description: Successful response
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    request:
                      $ref: '#/components/schemas/${generatedData["Object Request"]}'
                    response:
                      $ref: '#/components/schemas/${generatedData["Object Response"]}'
  components:
    schemas:
      ${generatedData["Object Request"]}:
        type: object
        properties:
          exampleProperty:
            type: string
            description: Example property for request
      ${generatedData["Object Response"]}:
        type: object
        properties:
          exampleProperty:
            type: string
            description: Example property for response
    `;
  
    // Crear un blob y descargar el archivo
    const blob = new Blob([yamlContent], { type: "application/x-yaml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${generatedData["API Name"]}-swagger.yaml`;
    link.click();
  };

  return (
    <div className="container">
      <h1 className="title">Semantic API (BIAN v12) - Generator</h1>
      <div className="form-group">
        <label>BIAN Business Area:</label>
        <select
          value={selectedBusinessArea}
          onChange={(e) => {
            setSelectedBusinessArea(e.target.value);
            setSelectedDomain("");
            setSelectedService("");
          }}
          className="form-control"
        >
          <option value="">Select Business Area</option>
          {data["business-areas"].map((area) => (
            <option key={area["codigo-ba"]} value={area["business-area"]}>
              {area["business-area"]}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>BIAN Business Domain:</label>
        <select
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value);
            setSelectedService("");
          }}
          disabled={!selectedBusinessArea}
          className="form-control"
        >
          <option value="">Select Business Domain</option>
          {data["business-areas"]
            .find((area) => area["business-area"] === selectedBusinessArea)
            ?.["business-domains"].map((domain) => (
              <option key={domain["codigo-bd"]} value={domain["business-domain"]}>
                {domain["business-domain"]}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>BIAN Service Domain:</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          disabled={!selectedDomain}
          className="form-control"
        >
          <option value="">Select Service Domain</option>
          {data["business-areas"]
            .find((area) => area["business-area"] === selectedBusinessArea)
            ?.["business-domains"]
            .find((domain) => domain["business-domain"] === selectedDomain)
            ?.["service-domains"].map((service) => (
              <option key={service["codigo-sd"]} value={service["service-domain"]}>
                {service["service-domain"]}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <label>API Type:</label>
        <select
          value={apiType}
          onChange={(e) => setApiType(e.target.value)}
          className="form-control"
        >
          <option value="">Select API Type</option>
          <option value="channel">Channel</option>
          <option value="business">Business</option>
          <option value="support">Support</option>
          <option value="workload">Workload</option>
        </select>
      </div>
      <div className="form-group">
        <label>API Version:</label>
        <select
          value={apiVersion}
          onChange={(e) => setApiVersion(e.target.value)}
          className="form-control"
        >
          <option value="">Select API Version</option>
          <option value="1.0">v1.0</option>
          <option value="2.0">v2.0</option>
          <option value="3.0">v3.0</option>
        </select>
      </div>
      <div className="form-group">
        <label>Method HTTP:</label>
        <select
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setActionTerm("");
          }}
          className="form-control"
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </div>
      <div className="form-group">
        <label>Action Term:</label>
        <select
          value={actionTerm}
          onChange={(e) => setActionTerm(e.target.value)}
          disabled={!method}
          className="form-control"
        >
          <option value="">Select Action Term</option>
          {availableActionTerms.map((term) => (
            <option key={term} value={term}>
              {term}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Behavior Qualifier:</label>
        <input
          type="text"
          value={behaviorQualifier}
          onChange={(e) => setBehaviorQualifier(e.target.value)}
          className="form-control"
        />
      </div>
      <button onClick={handleGenerateAPI} className="generate-button">
        Generate BIAN Semantic API
      </button>
      <button onClick={handleDownloadYAML} className="download-button">
          Descargar API Swagger YAML
        </button>

      {Object.keys(generatedData).length > 0 && (
        <div className="generated-data">
          <h2>BIAN Semantic API Generate</h2>
          <ul>
            {Object.entries(generatedData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default App;

