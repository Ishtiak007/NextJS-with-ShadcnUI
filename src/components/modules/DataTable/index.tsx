"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Download,
  Filter,
} from "lucide-react";
import { useState } from "react";

type Status = "Active" | "Pending" | "Archived" | "Failed";
type Plan = "Starter" | "Pro" | "Enterprise";

interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  status: Status;
  mrr: number;
  joined: string;
}

const data: User[] = [
  {
    id: "USR-001",
    name: "Mira Okonkwo",
    email: "mira@vercel.com",
    plan: "Enterprise",
    status: "Active",
    mrr: 2400,
    joined: "Jan 12, 2024",
  },
  {
    id: "USR-002",
    name: "Theo Hartmann",
    email: "theo@stripe.com",
    plan: "Pro",
    status: "Active",
    mrr: 490,
    joined: "Feb 3, 2024",
  },
  {
    id: "USR-003",
    name: "Yuki Tanaka",
    email: "yuki@linear.app",
    plan: "Pro",
    status: "Pending",
    mrr: 490,
    joined: "Feb 28, 2024",
  },
  {
    id: "USR-004",
    name: "Sofia Reyes",
    email: "sofia@loom.com",
    plan: "Enterprise",
    status: "Active",
    mrr: 2400,
    joined: "Mar 5, 2024",
  },
  {
    id: "USR-005",
    name: "James Whitfield",
    email: "james@railway.app",
    plan: "Starter",
    status: "Active",
    mrr: 0,
    joined: "Mar 14, 2024",
  },
  {
    id: "USR-006",
    name: "Priya Nair",
    email: "priya@anthropic.com",
    plan: "Enterprise",
    status: "Active",
    mrr: 2400,
    joined: "Apr 1, 2024",
  },
  {
    id: "USR-007",
    name: "Luca Ferretti",
    email: "luca@figma.com",
    plan: "Pro",
    status: "Failed",
    mrr: 490,
    joined: "Apr 9, 2024",
  },
  {
    id: "USR-008",
    name: "Aisha Mensah",
    email: "aisha@planetscale.com",
    plan: "Starter",
    status: "Archived",
    mrr: 0,
    joined: "Apr 22, 2024",
  },
  {
    id: "USR-009",
    name: "Daniel Park",
    email: "daniel@resend.com",
    plan: "Pro",
    status: "Active",
    mrr: 490,
    joined: "May 7, 2024",
  },
  {
    id: "USR-010",
    name: "Zara Collins",
    email: "zara@supabase.io",
    plan: "Enterprise",
    status: "Pending",
    mrr: 2400,
    joined: "May 19, 2024",
  },
];

const statusConfig: Record<Status, { label: string; className: string }> = {
  Active: {
    label: "Active",
    className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  },
  Pending: {
    label: "Pending",
    className: "border-amber-500/30  bg-amber-500/10  text-amber-400",
  },
  Archived: {
    label: "Archived",
    className: "border-zinc-600/40   bg-zinc-700/20   text-zinc-500",
  },
  Failed: {
    label: "Failed",
    className: "border-rose-500/30   bg-rose-500/10   text-rose-400",
  },
};

const planConfig: Record<Plan, { className: string }> = {
  Starter: { className: "border-zinc-600/30 bg-zinc-700/20 text-zinc-400" },
  Pro: { className: "border-violet-500/30 bg-violet-500/10 text-violet-400" },
  Enterprise: { className: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400" },
};

//  columns

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="font-mono text-[11px] text-zinc-600">
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    ),
    cell: ({ row }) => (
      <div>
        <p className="font-medium text-white text-sm">{row.getValue("name")}</p>
        <p className="text-[11px] text-zinc-600">{row.original.email}</p>
      </div>
    ),
  },
  {
    accessorKey: "plan",
    header: "Plan",
    cell: ({ row }) => {
      const plan = row.getValue("plan") as Plan;
      return (
        <Badge
          variant="outline"
          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${planConfig[plan].className}`}
        >
          {plan}
        </Badge>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;
      const cfg = statusConfig[status];
      return (
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background:
                status === "Active"
                  ? "#34d399"
                  : status === "Pending"
                    ? "#fbbf24"
                    : status === "Failed"
                      ? "#f87171"
                      : "#52525b",
            }}
          />
          <Badge
            variant="outline"
            className={`text-[10px] font-semibold px-2 py-0.5 ${cfg.className}`}
          >
            {cfg.label}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "mrr",
    header: ({ column }) => (
      <button
        className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        MRR
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="h-3 w-3" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="h-3 w-3" />
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-40" />
        )}
      </button>
    ),
    cell: ({ row }) => {
      const mrr = row.getValue("mrr") as number;
      return (
        <span
          className={`font-mono text-sm font-semibold ${mrr > 0 ? "text-white" : "text-zinc-700"}`}
        >
          {mrr > 0 ? `$${mrr.toLocaleString()}` : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-xs text-zinc-500">{row.getValue("joined")}</span>
    ),
  },
];

// dataTable Component

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: { sorting, columnFilters },
  });

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-600" />
          <Input
            placeholder="Search by name…"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("name")?.setFilterValue(e.target.value)
            }
            className="h-9 pl-9 text-sm bg-white/[0.03] border-white/[0.08] text-white placeholder:text-zinc-600 focus-visible:ring-violet-500/40 focus-visible:border-violet-500/40 rounded-xl"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-xl border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.14]"
          >
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-9 gap-2 rounded-xl border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white hover:border-white/[0.14]"
          >
            <Download className="h-3.5 w-3.5" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-white/[0.06] hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-4 text-[11px] font-semibold uppercase tracking-widest text-zinc-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, i) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-white/[0.04] transition-colors hover:bg-white/[0.03] cursor-pointer"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3.5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center text-sm text-zinc-600"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-zinc-600">
          Showing{" "}
          <span className="text-zinc-400 font-medium">
            {table.getRowModel().rows.length}
          </span>{" "}
          of <span className="text-zinc-400 font-medium">{data.length}</span>{" "}
          users
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="h-8 px-3 rounded-lg border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white disabled:opacity-30"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="h-8 px-3 rounded-lg border-white/[0.08] bg-white/[0.03] text-xs text-zinc-400 hover:bg-white/[0.06] hover:text-white disabled:opacity-30"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

// page section

export default function DataTableSection() {
  const totalMrr = data.reduce((s, u) => s + u.mrr, 0);
  const activeCount = data.filter((u) => u.status === "Active").length;

  return (
    <section className="relative w-full overflow-hidden bg-[#080808] py-24 text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-violet-900/10 blur-[120px]" />
      </div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-zinc-600">
              Customer Data
            </p>
            <h2
              className="text-4xl font-black leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "'Georgia','Times New Roman',serif" }}
            >
              User{" "}
              <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Overview
              </span>
            </h2>
          </div>

          {/* Summary stats */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-2xl font-black text-white tabular-nums">
                ${totalMrr.toLocaleString()}
              </p>
              <p className="text-[11px] text-zinc-600 uppercase tracking-wider">
                Total MRR
              </p>
            </div>
            <div className="h-10 w-px bg-white/[0.06]" />
            <div className="text-right">
              <p className="text-2xl font-black text-emerald-400 tabular-nums">
                {activeCount}
              </p>
              <p className="text-[11px] text-zinc-600 uppercase tracking-wider">
                Active
              </p>
            </div>
          </div>
        </div>

        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
}
