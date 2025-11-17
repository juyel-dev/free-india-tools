import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';

export function useTools() {
  const [tools, setTools] = useState([]);
  const [pendingTools, setPendingTools] = useState([]);
  const [userTools, setUserTools] = useState([]);
  const [favoriteTools, setFavoriteTools] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all tools
  useEffect(() => {
    const toolsQuery = query(collection(db, 'tools'), where('status', '==', 'approved'));
    const unsubscribeTools = onSnapshot(toolsQuery, (snapshot) => {
      const toolsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTools(toolsData);
    });

    // Fetch pending tools
    const pendingQuery = query(collection(db, 'tools'), where('status', '==', 'pending'));
    const unsubscribePending = onSnapshot(pendingQuery, (snapshot) => {
      const pendingData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPendingTools(pendingData);
    });

    // Fetch users
    const usersQuery = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    setLoading(false);

    return () => {
      unsubscribeTools();
      unsubscribePending();
      unsubscribeUsers();
    };
  }, []);

  // Fetch user-specific tools
  const fetchUserTools = async (userId) => {
    const userToolsQuery = query(
      collection(db, 'tools'),
      where('submittedBy', '==', userId)
    );
    const snapshot = await getDocs(userToolsQuery);
    const userToolsData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUserTools(userToolsData);
  };

  // Fetch user's favorite tools
  const fetchFavoriteTools = async (userId) => {
    // In a real app, you'd have a favorites collection
    // This is a simplified example
    const favorites = tools.filter((tool) =>
      tool.favoritedBy?.includes(userId)
    );
    setFavoriteTools(favorites);
  };

  const submitTool = async (toolData) => {
    await addDoc(collection(db, 'tools'), toolData);
  };

  const approveTool = async (toolId) => {
    const toolRef = doc(db, 'tools', toolId);
    await updateDoc(toolRef, {
      status: 'approved',
      approvedAt: new Date().toISOString(),
    });
  };

  const rejectTool = async (toolId) => {
    const toolRef = doc(db, 'tools', toolId);
    await updateDoc(toolRef, {
      status: 'rejected',
    });
  };

  const favoriteTool = async (tool) => {
    const toolRef = doc(db, 'tools', tool.id);
    const userId = 'current-user-id'; // Replace with actual user ID

    if (tool.favoritedBy?.includes(userId)) {
      // Remove from favorites
      await updateDoc(toolRef, {
        favoritedBy: tool.favoritedBy.filter((id) => id !== userId),
      });
    } else {
      // Add to favorites
      await updateDoc(toolRef, {
        favoritedBy: [...(tool.favoritedBy || []), userId],
      });
    }
  };

  const reportTool = async (tool) => {
    // Implement reporting logic
    console.log('Reporting tool:', tool.id);
  };

  return {
    tools,
    pendingTools,
    userTools,
    favoriteTools,
    users,
    loading,
    submitTool,
    approveTool,
    rejectTool,
    favoriteTool,
    reportTool,
    fetchUserTools,
    fetchFavoriteTools,
  };
}
