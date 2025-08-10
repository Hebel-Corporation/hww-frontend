"use client";

import { getOfficePromotions } from "@/actions/office-actions";
import { AccountType } from "@/types";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { Printer } from "lucide-react";
import React from "react";

const PrintPromotionButton = ({
  promotionId,
  officeId,
  currentPage,
}: {
  promotionId: string;
  officeId: string;
  currentPage: number;
}) => {
  

  const handlePrint = React.useCallback(async () => {
    const promotion = await getOfficePromotions({
      officeId: officeId,
      promId: promotionId,
      page: currentPage,
    });

    const printContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Comptes Qualifiés - Promotion</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  color: #333;
                }
                .header {
                  text-align: center;
                  margin-bottom: 30px;
                  border-bottom: 2px solid #333;
                  padding-bottom: 10px;
                }
                .info {
                  margin-bottom: 20px;
                  font-size: 14px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-bottom: 20px;
                }
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                  font-size: 12px;
                }
                th {
                  background-color: #f5f5f5;
                  font-weight: bold;
                }
                .footer {
                  margin-top: 20px;
                  font-size: 12px;
                  text-align: center;
                  color: #666;
                }
                @media print {
                  body { margin: 0; }
                  .header { page-break-after: avoid; }
                }
              </style>
            </head>
            <body>
              <div class="header">
                <h2>Comptes Qualifiés</h2>
                <h3>Promotion: ${promotion?.title || "-"}</h3>
              </div>
              
              <div class="info">
                <p><strong>Date d'impression:</strong> ${new Date().toLocaleDateString(
                  "fr-FR",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}</p>
                <p><strong>Page courante:</strong> ${currentPage} sur ${
      promotion?.members?.total_pages || 1
    }</p>
                <p><strong>Total des résultats:</strong> ${
                  promotion?.members?.count || 0
                }</p>
              </div>
    
              <table>
                <thead>
                  <tr>
                    <th>Membre</th>
                    <th>Téléphone</th>
                    <th>Bureau</th>
                    <th>Condition</th>
                    <th>Cadeau</th>
                  </tr>
                </thead>
                <tbody>
                  ${
                    promotion?.members?.results
                      ?.map(
                        (account: AccountType) => `
                    <tr>
                      <td>
                        <strong>${account.member.first_name} ${account.member.last_name}</strong><br>
                        <small>ID: ${account.member.company_id}</small>
                      </td>
                      <td>${account.member.phone}</td>
                      <td>
                        <strong>${account.office.name || '-'}</strong><br>
                        <small>${account.office.office_code} - ${account.office.location.name}</small>
                      </td>
                      <td>
                        <strong>${account.promotions?.find(p => p.promotion.id === promotionId)?.unit_number || '-'}</strong><br>
                        <small>${account.promotions?.find(p => p.promotion.id === promotionId)?.unit_type_display || '-'}</small>
                      </td>
                      <td>
                        <strong>${account.promotions?.find(p => p.promotion.id === promotionId)?.gift?.name || '-'}</strong><br>
                        <small>~${account.promotions?.find(p => p.promotion.id === promotionId)?.equivalent_amount || '0'} $</small>
                      </td>
                    </tr>
                  `
                      )
                      .join("") ||
                    '<tr><td colspan="5" style="text-align: center;">Aucun compte qualifié trouvé</td></tr>'
                  }
                </tbody>
              </table>
    
              <div class="footer">
                <p>Health Winning World - ${new Date().getFullYear()}</p>
              </div>
            </body>
          </html>
        `;

    // Créer un iframe caché pour l'impression
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.border = 'none';
    
    document.body.appendChild(iframe);
    
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (iframeDoc) {
      iframeDoc.write(printContent);
      iframeDoc.close();
      
      // Attendre que le contenu soit chargé puis imprimer
      let printed = false;
      
      iframe.onload = () => {
        if (!printed) {
          printed = true;
          iframe.contentWindow?.print();
          
          // Nettoyer après impression
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 1000);
        }
      };
      
      // Si onload ne se déclenche pas dans les 1000ms, forcer l'impression
      setTimeout(() => {
        if (!printed) {
          printed = true;
          iframe.contentWindow?.print();
          setTimeout(() => {
            if (document.body.contains(iframe)) {
              document.body.removeChild(iframe);
            }
          }, 1000);
        }
      }, 1000);
    }
  }, [currentPage]);



  const handlePrintAll = React.useCallback(async () => {
    if (!promotionId || !officeId) return;

    try {
      // Récupérer la première page pour connaître le nombre total de pages
      const firstPageData = await getOfficePromotions({
        officeId: officeId,
        promId: promotionId,
        page: 1,
      });

      const totalPages = firstPageData?.members?.total_pages || 1;
      let allAccounts: AccountType[] = [];

      // Récupérer toutes les pages
      for (let page = 1; page <= totalPages; page++) {
        const pageData = await getOfficePromotions({
          officeId: officeId,
          promId: promotionId,
          page: page,
        });

        if (pageData?.members?.results) {
          allAccounts = [...allAccounts, ...pageData.members.results];
        }
      }

      // Utiliser les données de la première page pour les métadonnées
      const allData = {
        ...firstPageData,
        members: {
          ...firstPageData.members,
          results: allAccounts,
        },
      };

      const printContent = `
            <!DOCTYPE html>
            <html>
              <head>
                <title>Comptes Qualifiés - Promotion</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    color: #333;
                  }
                  .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 2px solid #333;
                    padding-bottom: 10px;
                  }
                  .info {
                    margin-bottom: 20px;
                    font-size: 14px;
                  }
                  table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                  }
                  th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                    font-size: 12px;
                  }
                  th {
                    background-color: #f5f5f5;
                    font-weight: bold;
                  }
                  .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    text-align: center;
                    color: #666;
                  }
                  @media print {
                    body { margin: 0; }
                    .header { page-break-after: avoid; }
                  }
                </style>
              </head>
              <body>
                <div class="header">
                  <h2>Comptes Qualifiés</h2>
                  <h3>Promotion: ${allData?.title || "N/A"}</h3>
                </div>
                
                <div class="info">
                  <p><strong>Date d'impression:</strong> ${new Date().toLocaleDateString(
                    "fr-FR",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}</p>
                  <p><strong>Total des résultats:</strong> ${
                    allData?.members?.count || 0
                  }</p>
                </div>
    
                <table>
                  <thead>
                    <tr>
                      <th>Membre</th>
                      <th>Téléphone</th>
                      <th>Bureau</th>
                      <th>Condition</th>
                      <th>Cadeau</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${
                      allData?.members?.results
                        ?.map(
                          (account: AccountType) => `
                      <tr>
                        <td>
                          <strong>${account.member.first_name} ${account.member.last_name}</strong><br>
                          <small>ID: ${account.member.company_id}</small>
                        </td>
                        <td>${account.member.phone}</td>
                        <td>
                          <strong>${account.office.name || '-'}</strong><br>
                          <small>${account.office.office_code} - ${account.office.location.name}</small>
                        </td>
                        <td>
                          <strong>${account.promotions?.find(p => p.promotion.id === promotionId)?.unit_number || '-'}</strong><br>
                          <small>${account.promotions?.find(p => p.promotion.id === promotionId)?.unit_type_display || '-'}</small>
                        </td>
                        <td>
                          <strong>${account.promotions?.find(p => p.promotion.id === promotionId)?.gift?.name || '-'}</strong><br>
                          <small>~${account.promotions?.find(p => p.promotion.id === promotionId)?.equivalent_amount || '0'} $</small>
                        </td>
                      </tr>
                    `
                        )
                        .join("") ||
                      '<tr><td colspan="5" style="text-align: center;">Aucun compte qualifié trouvé</td></tr>'
                    }
                  </tbody>
                </table>
    
                <div class="footer">
                  <p>Health Winning World - ${new Date().getFullYear()}</p>
                </div>
              </body>
            </html>
          `;

      // Créer un iframe caché pour l'impression
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '0px';
      iframe.style.height = '0px';
      iframe.style.border = 'none';
      
      document.body.appendChild(iframe);
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDoc) {
        iframeDoc.write(printContent);
        iframeDoc.close();
        
        // Attendre que le contenu soit chargé puis imprimer
        let printed = false;
        
        iframe.onload = () => {
          if (!printed) {
            printed = true;
            iframe.contentWindow?.print();
            
            // Nettoyer après impression
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          }
        };
        
        // Si onload ne se déclenche pas dans les 1000ms, forcer l'impression
        setTimeout(() => {
          if (!printed) {
            printed = true;
            iframe.contentWindow?.print();
            setTimeout(() => {
              if (document.body.contains(iframe)) {
                document.body.removeChild(iframe);
              }
            }, 1000);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Erreur lors de l'impression complète:", error);
      alert("Erreur lors de la récupération des données pour l'impression");
    }
  }, [promotionId, officeId]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="flat"
          endContent={<Printer className="h-4 w-4" />}
          className="focus:outline-none"
        >
          Imprimer
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Options d'impression">
        <DropdownItem
          key="current-page"
          onPress={handlePrint}
          startContent={<Printer className="h-4 w-4" />}
        >
          Imprimer la page courante
        </DropdownItem>
        <DropdownItem
          key="all-pages"
          onPress={handlePrintAll}
          startContent={<Printer className="h-4 w-4" />}
        >
          Imprimer toutes les pages
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default PrintPromotionButton;
