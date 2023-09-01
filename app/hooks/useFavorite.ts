import axios from "axios";
import { useRouter } from "next/navigation";
import { useMemo, useCallback } from 'react';
import { toast } from "react-hot-toast";

import { SafeUser } from '../types/index';
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
    listingId: string
    currentUser?: SafeUser | null
}

const useFavorite = ({
    listingId,
    currentUser
}: IUseFavorite) => {
    const router = useRouter()
    const loginModal = useLoginModal()

    const hasFavorited = useMemo(() => {
        const list = currentUser?.favoriteIds || []

        return list.includes(listingId)
    }, [currentUser, listingId])

    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()

        if (!currentUser) {
            return loginModal.onOpen()
        }

        try {
            let request;

            if (hasFavorited) {
                request = await axios.delete(`/api/favorites/${listingId}`)
            } else {
                request = await axios.post(`/api/favorites/${listingId}`)
            }

            await request.data

            router.refresh()
            toast.success('Se ha actualizado tu lista de favoritos')

        } catch (error) {
            toast.error('Algo ha salido mal')
        }

    }, [currentUser, hasFavorited, listingId, loginModal, router])

    return {
        hasFavorited,
        toggleFavorite
    }
}

export default useFavorite

