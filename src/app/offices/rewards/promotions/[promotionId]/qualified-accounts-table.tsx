"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Skeleton,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from "@heroui/react";
import { Search, ChevronDown, Eye, EyeOff, Printer, CheckCircle, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getOfficePromotions } from "@/actions/office-actions";
import { AccountType, PromotionItemType, PromotionType } from "@/types";
import PrintPromotionButton from "./print-promotion-button";



interface QualifiedAccountsTableProps {
  promotionId: string;
  officeId: string;
}

const columnHelper = createColumnHelper<AccountType>();

const QualifiedAccountsTable: React.FC<QualifiedAccountsTableProps> = ({
  promotionId,
  officeId,
}) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: promotion = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["qualified-accounts", promotionId, currentPage],
    queryFn: () =>
      getOfficePromotions({
        officeId: officeId,
        promId: promotionId,
        page: currentPage,
      }),
    enabled: !!promotionId,
  });

  // Définir les colonnes
  const columns = useMemo<ColumnDef<AccountType, any>[]>(
    () => [
      columnHelper.accessor("member", {
        header: "Membre",
        cell: (info) => {
          const member = info.getValue();
          return (
            <div className="flex flex-col">
              <span className="font-medium">
                {member.first_name} {member.last_name}
              </span>
              <span className="text-[11px] text-gray-500">
                ID: {member.company_id}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("member.phone", {
        header: "Téléphone",
        cell: (info) => <span className="text-sm">{info.getValue()}</span>,
      }),
      columnHelper.accessor("office", {
        header: "Bureau",
        cell: (info) => {
          const office = info.getValue();
          return (
            <div className="flex flex-col">
              <span className="font-medium text-sm">{office.name || "-"}</span>
              <span className="text-xs text-gray-500">
                {office.office_code} - {office.location.name}
              </span>
            </div>
          );
        },
      }),
      columnHelper.accessor("promotions", {
        header: "Condition",
        cell: (info) => {
          const promotions = info.getValue();
          const promotionItem = promotions?.find((p: PromotionItemType) => p.promotion.id === promotionId);

          return (
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">{promotionItem?.unit_number}</h1>
              <span className="text-sm text-gray-500">{promotionItem?.unit_type_display}</span>
            </div>
          );
        },
      }),
      columnHelper.accessor("promotions", {
        header: "Cadeau",
        cell: (info) => {
          const promotions = info.getValue();
          const promotionItem = promotions?.find((p: PromotionItemType) => p.promotion.id === promotionId);

          return (
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">{promotionItem?.gift.name}</h1>
              <span className="text-sm text-gray-500">~{promotionItem?.equivalent_amount} $</span>
            </div>
          );
        },
      }),
      // columnHelper.accessor("promotions", {
      //   header: "Qualifications",
      //   cell: (info) => (
      //     <Chip size="sm" color="success" variant="flat">
      //       {info.getValue()}
      //     </Chip>
      //   ),
      // }),
      // columnHelper.accessor("qualification_type", {
      //   header: "Type",
      //   cell: (info) => {
      //     const type = info.getValue();
      //     const color = type === "matching" ? "primary" : "secondary";
      //     const label = type === "matching" ? "Équilibre" : "Parrainage";
      //     return (
      //       <Chip size="sm" color={color} variant="flat">
      //         {label}
      //       </Chip>
      //     );
      //   },
      // }),
      // columnHelper.accessor("created_at", {
      //   header: "Date de qualification",
      //   cell: (info) => {
      //     const date = new Date(info.getValue());
      //     return (
      //       <span className="text-sm">{date.toLocaleDateString("fr-FR")}</span>
      //     );
      //   },
      // }),
    ],
    []
  );

  const table = useReactTable({
    data: promotion?.members?.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true, // Désactiver la pagination côté client
    pageCount: promotion?.members?.total_pages || 0,
    state: {
      globalFilter,
      columnVisibility,
      pagination: {
        pageIndex: currentPage - 1, // TanStack Table utilise un index basé sur 0
        pageSize: 100, // Taille de page (peut être dynamique)
      },
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: "includesString",
  });

  const pages = promotion?.members?.total_pages || 0;

  const onNextPage = React.useCallback(() => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const handlePrint = React.useCallback(() => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

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
            <h3>Promotion: ${promotion?.title || 'N/A'}</h3>
          </div>
          
          <div class="info">
            <p><strong>Date d'impression:</strong> ${new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
            <p><strong>Page courante:</strong> ${currentPage} sur ${promotion?.members?.total_pages || 1}</p>
            <p><strong>Total des résultats:</strong> ${promotion?.members?.count || 0}</p>
          </div>

          <table>
            <thead>
              <tr>
                <th>Membre</th>
                <th>Téléphone</th>
                <th>Bureau</th>
              </tr>
            </thead>
            <tbody>
              ${promotion?.members?.results?.map((account: AccountType) => `
                <tr>
                  <td>
                    <strong>${account.member.first_name} ${account.member.last_name}</strong><br>
                    <small>${account.member.company_id}</small>
                  </td>
                  <td>${account.member.phone}</td>
                  <td>
                    <strong>${account.office.name}</strong><br>
                    <small>${account.office.office_code} - ${account.office.location.name}</small>
                  </td>
                </tr>
              `).join('') || '<tr><td colspan="3" style="text-align: center;">Aucun compte qualifié trouvé</td></tr>'}
            </tbody>
          </table>

          <div class="footer">
            <p>Document généré automatiquement - ${new Date().getFullYear()}</p>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }, [promotion, currentPage]);

  const handlePrintAll = React.useCallback(async () => {
    if (!promotionId || !officeId) return;
    
    try {
      // Récupérer la première page pour connaître le nombre total de pages
      const firstPageData = await getOfficePromotions({ 
        officeId: officeId, 
        promId: promotionId,
        page: 1
      });
      
      const totalPages = firstPageData?.members?.total_pages || 1;
      let allAccounts: AccountType[] = [];
      
      // Récupérer toutes les pages
      for (let page = 1; page <= totalPages; page++) {
        const pageData = await getOfficePromotions({ 
          officeId: officeId, 
          promId: promotionId,
          page: page
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
          results: allAccounts
        }
      };

      const printWindow = window.open('', '_blank');
      if (!printWindow) return;

      const printContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Comptes Qualifiés - Promotion (Complet)</title>
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
              <h2>Comptes Qualifiés (Document Complet)</h2>
              <h3>Promotion: ${allData?.title || 'N/A'}</h3>
            </div>
            
            <div class="info">
              <p><strong>Date d'impression:</strong> ${new Date().toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
              <p><strong>Total des résultats:</strong> ${allData?.members?.count || 0}</p>
              <p><strong>Type:</strong> Document complet (toutes les pages)</p>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Membre</th>
                  <th>Téléphone</th>
                  <th>Bureau</th>
                </tr>
              </thead>
              <tbody>
                ${allData?.members?.results?.map((account: AccountType) => `
                  <tr>
                    <td>
                      <strong>${account.member.first_name} ${account.member.last_name}</strong><br>
                      <small>${account.member.company_id}</small>
                    </td>
                    <td>${account.member.phone}</td>
                    <td>
                      <strong>${account.office.name}</strong><br>
                      <small>${account.office.office_code} - ${account.office.location.name}</small>
                    </td>
                  </tr>
                `).join('') || '<tr><td colspan="3" style="text-align: center;">Aucun compte qualifié trouvé</td></tr>'}
              </tbody>
            </table>

            <div class="footer">
              <p>Document généré automatiquement - ${new Date().getFullYear()}</p>
            </div>
          </body>
        </html>
      `;

      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    } catch (error) {
      console.error('Erreur lors de l\'impression complète:', error);
      alert('Erreur lors de la récupération des données pour l\'impression');
    }
  }, [promotionId, officeId]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">
          Erreur lors du chargement des comptes qualifiés.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 space-y-4">
      {/* Barre de recherche et contrôles */}
      {isLoading ? (
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-80 rounded-lg" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-32 rounded-lg" />
            <Skeleton className="h-10 w-32 rounded-lg" />
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-between items-center gap-4">
          <Input
            placeholder="Rechercher un compte..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            startContent={<Search className="h-4 w-4 text-gray-400" />}
            className="max-w-sm"
          />

          <div className="w-full sm:max-w-max flex justify-between gap-3.5">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  variant="bordered"
                  endContent={<ChevronDown className="h-4 w-4" />}
                >
                  Colonnes
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Gestion des colonnes"
                closeOnSelect={false}
                selectionMode="multiple"
                selectedKeys={Object.keys(columnVisibility).filter(
                  (key) =>
                    columnVisibility[key as keyof typeof columnVisibility]
                )}
                onSelectionChange={(keys) => {
                  const newVisibility = {} as typeof columnVisibility;
                  table.getAllColumns().forEach((column) => {
                    newVisibility[column.id as keyof typeof columnVisibility] =
                      keys === "all" || (keys as Set<string>).has(column.id);
                  });
                  setColumnVisibility(newVisibility);
                }}
              >
                {table.getAllColumns().map((column) => (
                  <DropdownItem
                    key={column.id}
                    startContent={
                      column.getIsVisible() ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )
                    }
                  >
                    {column.columnDef.header as string}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            {/* Print */}
            <PrintPromotionButton 
              promotionId={promotionId}   
              officeId={officeId} 
              currentPage={currentPage} 
            />
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 justify-between ">
        {/* Tableau */}
        <Table
          aria-label="Comptes qualifiés"
          shadow="none"
          classNames={{
            wrapper: "bg-red-transparent min-h-96 p-0",
          }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableColumn
                    key={header.id}
                    className="cursor-pointer select-none"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() && (
                        <span className="text-xs">
                          {header.column.getIsSorted() === "desc" ? "↓" : "↑"}
                        </span>
                      )}
                    </div>
                  </TableColumn>
                ))}
              </React.Fragment>
            ))}
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={
              <div className="flex flex-1 justify-center items-center p-14">
                <Spinner />
              </div>
            }
            emptyContent={
              <div className="flex flex-1 justify-center items-center p-14">
                <p className="text-center text-gray-500">
                  Aucun compte qualifié trouvé.
                </p>
              </div>
            }
          >
            {table.getRowModel()?.rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <span className="text-sm text-gray-500">
            {promotion?.members?.count > 0 &&
            promotion?.members?.results?.length > 0 ? (
              <>
                {(() => {
                  // Calculer la taille de page basée sur les données actuelles
                  const pageSize = promotion.members.results.length;
                  const startItem = (currentPage - 1) * pageSize + 1;
                  const endItem = startItem + pageSize - 1;

                  return `${startItem} à ${Math.min(
                    endItem,
                    promotion.members.count
                  )} éléments sur ${promotion.members.count} résultats`;
                })()}
              </>
            ) : (
              <></>
            )}
          </span>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="bordered"
              onPress={onPreviousPage}
              isDisabled={pages === 1 || !promotion?.members?.previous}
              className="hidden md:block"
            >
              Précédent
            </Button>

            <Pagination
              total={pages}
              page={currentPage}
              onChange={(page) => setCurrentPage(page)}
              size="sm"
            />

            <Button
              size="sm"
              variant="bordered"
              onPress={onNextPage}
              isDisabled={pages === 1 || !promotion?.members?.next}
              className="hidden md:block"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualifiedAccountsTable;
