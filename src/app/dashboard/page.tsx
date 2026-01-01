import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center p-8">
                <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
            </div>
        )
    }

    const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">내 프로젝트</h1>
                    <p className="mt-2 text-gray-600">
                        진행 중인 탐구 활동과 결과물을 관리하세요.
                    </p>
                </div>
                <Link href="/search">
                    <Button className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        새 프로젝트 (탐구 주제 찾기)
                    </Button>
                </Link>
            </div>

            {projects && projects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <Link href={`/report/${project.id}`} key={project.id}>
                            <div className="group relative flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-600 hover:shadow-md h-full">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">
                                            {project.subject || '주제 미정'}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {new Date(project.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 line-clamp-2">
                                        {project.title || 'Untitled Project'}
                                    </h3>
                                    <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                                        {project.description || 'No description provided.'}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
                                    <span className="text-gray-600">
                                        {project.grade_level ? `${project.grade_level}학년` : ''}
                                    </span>
                                    {project.progress !== undefined && (
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-indigo-600 rounded-full"
                                                    style={{ width: `${project.progress}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">{project.progress}%</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-slate-50 py-20 text-center">
                    <div className="rounded-full bg-white p-4 shadow-sm ring-1 ring-gray-900/5">
                        <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">시작된 프로젝트가 없습니다</h3>
                    <p className="mt-2 text-sm text-gray-500 max-w-sm">
                        아직 생성된 탐구 프로젝트가 없습니다. <br />새로운 주제를 찾아 탐구를 시작해보세요!
                    </p>
                    <div className="mt-6">
                        <Link href="/search">
                            <Button>새 프로젝트 시작하기</Button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
