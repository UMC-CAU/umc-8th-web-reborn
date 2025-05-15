import { useEffect, useState } from "react"
import { useGetInfiniteLpList } from "../hooks/queries/useGetInfiniteLpList"
import { PAGINATION_ORDER } from "../enums/common"
import { useInView } from "react-intersection-observer"
import LpCard from "../components/LpCard/LpCard"
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList"
import LpModal from "../components/LpModal"
import usePostLp from "../hooks/mutations/usePostLp"
import { IoAdd } from "react-icons/io5"
import { CreateLpDto, Lp } from "../types/lp"

const HomePage = () => {
    const [search, setSearch] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { data, isFetching, isError, isPending, hasNextPage, fetchNextPage } = useGetInfiniteLpList({ limit: 10, search, order: PAGINATION_ORDER.asc })
    //const {data,isLoading,isPending,isError}= useGetLpList({search,limit:50})
    const lps = data
    const { mutate: createLp, isPending: isCreating } = usePostLp()

    const { ref, inView } = useInView()

    useEffect(() => {
        if (inView && !isFetching && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage])

    const handleOpenModal = () => {
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
    }

    const handleCreateLp = (lpData: CreateLpDto) => {
        createLp(lpData, {
            onSuccess: () => {
                // 성공 시 모달 닫기
                setIsModalOpen(false)
            }
        })
    }

    return (
        <div className="mt-20 relative">
            <div className="flex justify-between items-center mb-6 px-4">
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-1/3"
                    placeholder="LP 검색..."
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                {isPending && <LpCardSkeletonList count={20} />}
                {lps?.pages?.map((page) => page.data.data)
                    ?.flat()
                    ?.map((lp: Lp) => (
                        <LpCard key={lp.id} lp={lp} />
                    ))}
                {isFetching && <LpCardSkeletonList count={20} />}
            </div>
            <div ref={ref} className="h-10 w-full">
            </div>

            {/* LP 추가 버튼 (우측 하단 고정) */}
            <button 
                onClick={handleOpenModal}
                className="fixed bottom-8 right-8 z-10 flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors"
                aria-label="LP 추가"
            >
                <IoAdd size={32} />
            </button>

            {/* LP 생성 모달 */}
            <LpModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleCreateLp}
            />
        </div>
    )
}

export default HomePage