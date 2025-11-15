// Analytics Service

import { db } from './firebase'
import { doc, updateDoc, increment, setDoc, getDoc } from 'firebase/firestore'

export const trackToolClick = async (toolId) => {
  if (!toolId || !db) return

  try {
    const toolRef = doc(db, 'tools', toolId)
    await updateDoc(toolRef, {
      totalClicks: increment(1),
      lastClickedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error tracking tool click:', error)
  }
}

export const trackToolView = async (toolId, userId = null) => {
  if (!toolId || !db) return

  try {
    const viewData = {
      toolId,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    }

    // Store in analytics collection
    const analyticsRef = doc(db, 'analytics', `view_${Date.now()}`)
    await setDoc(analyticsRef, viewData)
  } catch (error) {
    console.error('Error tracking tool view:', error)
  }
}

export const trackSearch = async (query, userId = null) => {
  if (!query || !db) return

  try {
    const searchData = {
      query: query.toLowerCase(),
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
    }

    const searchRef = doc(db, 'searches', `search_${Date.now()}`)
    await setDoc(searchRef, searchData)
  } catch (error) {
    console.error('Error tracking search:', error)
  }
}

export const trackUserAction = async (action, data = {}, userId = null) => {
  if (!action || !db) return

  try {
    const actionData = {
      action,
      userId: userId || 'anonymous',
      timestamp: new Date().toISOString(),
      ...data,
    }

    const actionRef = doc(db, 'user_actions', `action_${Date.now()}`)
    await setDoc(actionRef, actionData)
  } catch (error) {
    console.error('Error tracking user action:', error)
  }
}

export const getUserStats = async (userId) => {
  if (!userId || !db) return null

  try {
    const statsRef = doc(db, 'user_stats', userId)
    const statsDoc = await getDoc(statsRef)

    if (statsDoc.exists()) {
      return statsDoc.data()
    }

    return {
      toolsSubmitted: 0,
      totalClicks: 0,
      averageRating: 0,
    }
  } catch (error) {
    console.error('Error getting user stats:', error)
    return null
  }
}

export const updateUserStats = async (userId, stats) => {
  if (!userId || !db) return

  try {
    const statsRef = doc(db, 'user_stats', userId)
    await setDoc(statsRef, stats, { merge: true })
  } catch (error) {
    console.error('Error updating user stats:', error)
  }
}

export const getToolAnalytics = async (toolId) => {
  if (!toolId || !db) return null

  try {
    const toolRef = doc(db, 'tools', toolId)
    const toolDoc = await getDoc(toolRef)

    if (toolDoc.exists()) {
      const data = toolDoc.data()
      return {
        totalClicks: data.totalClicks || 0,
        totalRatings: data.totalRatings || 0,
        rating: data.rating || 0,
        lastClickedAt: data.lastClickedAt || null,
      }
    }

    return null
  } catch (error) {
    console.error('Error getting tool analytics:', error)
    return null
  }
}

export default {
  trackToolClick,
  trackToolView,
  trackSearch,
  trackUserAction,
  getUserStats,
  updateUserStats,
  getToolAnalytics,
}
