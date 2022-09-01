import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUserPreview } from "../../models/models"


interface GithubState {
	favourites: IUserPreview[]
}

const initialState: GithubState = {
	favourites: JSON.parse(localStorage.getItem('favourites') ?? '[]')
}

export const githubSlice = createSlice({
	name: 'github',
	initialState,
	reducers: {
		addFavourite(state: GithubState, action: PayloadAction<IUserPreview>) {
			state.favourites.push(action.payload)
			localStorage.setItem('favourites', JSON.stringify(state.favourites))
		},
		removeFavourite(state: GithubState, action: PayloadAction<IUserPreview>) {
			state.favourites = state.favourites.filter(user => user.login !== action.payload.login)
			localStorage.setItem('favourites', JSON.stringify(state.favourites))
		}
	}
})

export const githubActions = githubSlice.actions