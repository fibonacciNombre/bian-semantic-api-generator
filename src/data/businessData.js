const businessData = {
    dominio: "Procesamiento",
    "business-areas": [
      {
        "business-area": "VAS",
        "codigo-ba": "VAS",
        "business-domains": [
          {
            "business-domain": "Loyalty",
            "codigo-bd": "LOY",
            "service-domains": [
              { "service-domain": "redemption", "codigo-sd": "red" },
              { "service-domain": "validate", "codigo-sd": "val" },
            ],
          },
          {
            "business-domain": "Marca Cerrada",
            "codigo-bd": "MACE",
            "service-domains": [
              { "service-domain": "redemption", "codigo-sd": "red" },
              { "service-domain": "validate", "codigo-sd": "val" },
            ],
          },
        ],
      },
      {
        "business-area": "Venta No Presente",
        "codigo-ba": "VNP",
        "business-domains": [
          {
            "business-domain": "Visa Direct",
            "codigo-bd": "VDR",
            "service-domains": [
              { "service-domain": "authorize", "codigo-sd": "AUT" },
              { "service-domain": "validate", "codigo-sd": "VAL" },
            ],
          },
          {
            "business-domain": "Geminis",
            "codigo-bd": "GEM",
            "service-domains": [
              { "service-domain": "transaccion", "codigo-sd": "TRX" },
              { "service-domain": "monitoring", "codigo-sd": "MON" },
            ],
          },
        ],
      },
      { "business-area": "Instant Payments", "codigo-ba": "INP", "business-domains": [] },
      { "business-area": "Transversales", "codigo-ba": "TRV", "business-domains": [] },
      {
        "business-area": "Soluciones Multiagente",
        "codigo-ba": "SML",
        "business-domains": [
          {
            "business-domain": "Flow Management",
            "codigo-bd": "FLW",
            "service-domains": [
              { "service-domain": "redemption", "codigo-sd": "red" },
              { "service-domain": "monitoring", "codigo-sd": "MON" },
            ],
          },
        ],
      },
    ],
    "macro-capabilitys": [
        {
        "macro-capability": "authorization",
        "code-mc": "at",
        "capabilities-level-1": [
            { "capability-level-1": "capture", "codigo-cl1": "ca" },
            { "capability-level-1": "authorization", "codigo-cl1": "at" },
            { "capability-level-1": "fraud-prevention", "codigo-cl1": "fp" },
        ],
        },
        {
        "macro-capability": "compensation-settlement",
        "code-mc": "cs",
        "capabilities-level-1": [
            { "capability-level-1": "compensation", "codigo-cl1": "co" },
            { "capability-level-1": "settlement", "codigo-cl1": "se" },
        ],
        },
    ],
  };
  
  export default businessData;
  