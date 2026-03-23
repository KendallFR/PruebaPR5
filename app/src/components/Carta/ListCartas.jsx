import { useEffect, useState } from "react";
import { LoadingGrid } from "../ui/custom/LoadingGrid";
import { EmptyState } from "../ui/custom/EmptyState";
import { ErrorAlert } from "../ui/custom/ErrorAlert";
import { ListCardCartas } from "./ListCardCartas";
import CartaService from "@/services/CartaService";

export function ListCartas() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await CartaService.getCartas();
            setData(response.data);
            if (!response.data.success) {
                setError(response.data.message);
            }
        } catch (err) {
            if (err.name !== "AbortError") setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <LoadingGrid type="grid" />;
    if (error) return <ErrorAlert title="Error al cargar cartas" message={error} />;
    if (!data || data.data.length === 0)
        return <EmptyState message="No se encontraron cartas." />;

    return (
        <div className="mx-auto max-w-7xl p-6">
            {data && (
                <ListCardCartas 
                    data={data.data}
                    onRefresh={fetchData}  
                />
            )}
        </div>
    );
}
