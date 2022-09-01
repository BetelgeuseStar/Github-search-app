import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ISearchResponse, IUser, IUserInfo, IUserRepository } from '../../models/models'

export const githubApi = createApi({
	reducerPath: 'github/api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
	endpoints: (build) => ({
		searchUsers: build.query<ISearchResponse, { search: string, page: number }>({
			query: (args) => {
				const { search, page = 1 } = args;
				return {
					url: 'search/users',
					params: {
						q: args.search,
						page: args.page
					}
				}
			}
		}),
		getUserInfo: build.query<IUserInfo, string>({
			query: (login: string) => ({
				url: 'users/' + login
			})
		}),
		getUserRepositories: build.query<IUserRepository[], string>({
			query: (login: string) => ({
				url: `users/${login}/repos`
			})
		}),
		getUserFollowers: build.query<IUser[], { login: string, page: number }>({
			query: (args) => {
				const { login, page = 1 } = args;
				return {
					url: `users/${login}/followers`,
					params: {
						page: args.page
					}
				}

			}
		}),
		getUserFollowing: build.query<IUser[], { login: string, page: number }>({
			query: (args) => {
				const { login, page = 1 } = args;
				return {
					url: `users/${login}/following`,
					params: {
						page: args.page
					}
				}

			}
		})
	})
})

export const { useSearchUsersQuery, useGetUserInfoQuery, useGetUserFollowersQuery, useGetUserFollowingQuery, useGetUserRepositoriesQuery } = githubApi