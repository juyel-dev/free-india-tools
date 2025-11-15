import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  limit,
  increment,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/services/firebase';
import { TOOL_STATUS, ITEMS_PER_PAGE } from '@/utils/constants';
import { toast } from '@/components/ui/toast';

export const useTools = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all approved tools
  const fetchTools = async (filters = {}) => {
    try {
      setLoading(true);
      const toolsRef = collection(db, 'tools');
      let q = query(
        toolsRef,
        where('status', '==', TOOL_STATUS.APPROVED),
        orderBy('createdAt', 'desc')
      );

      // Apply category filter
      if (filters.category && filters.category !== 'all') {
        q = query(toolsRef, where('category', '==', filters.category), where('status', '==', TOOL_STATUS.APPROVED));
      }

      // Apply pricing filter
      if (filters.pricing) {
        q = query(q, where('pricing', '==', filters.pricing));
      }

      const querySnapshot = await getDocs(q);
      const toolsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      }));

      setTools(toolsList);
      setError(null);
    } catch (err) {
      console.error('Error fetching tools:', err);
      setError(err.message);
      toast.error('Failed to load tools');
    } finally {
      setLoading(false);
    }
  };

  // Fetch single tool by ID
  const fetchToolById = async (toolId) => {
    try {
      const toolRef = doc(db, 'tools', toolId);
      const toolSnap = await getDoc(toolRef);

      if (toolSnap.exists()) {
        return {
          id: toolSnap.id,
          ...toolSnap.data(),
          createdAt: toolSnap.data().createdAt?.toDate(),
          updatedAt: toolSnap.data().updatedAt?.toDate(),
        };
      }
      return null;
    } catch (err) {
      console.error('Error fetching tool:', err);
      throw err;
    }
  };

  // Submit a new tool (pending approval)
  const submitTool = async (toolData, userId) => {
    try {
      const toolRef = await addDoc(collection(db, 'tools'), {
        ...toolData,
        status: TOOL_STATUS.PENDING,
        submittedBy: userId,
        clicks: 0,
        favorites: 0,
        rating: 0,
        featured: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });

      toast.success('Tool submitted successfully! Awaiting approval.');
      return { success: true, id: toolRef.id };
    } catch (err) {
      console.error('Error submitting tool:', err);
      toast.error('Failed to submit tool');
      return { success: false, error: err.message };
    }
  };

  // Update tool (admin only)
  const updateTool = async (toolId, updates) => {
    try {
      const toolRef = doc(db, 'tools', toolId);
      await updateDoc(toolRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });

      toast.success('Tool updated successfully');
      return { success: true };
    } catch (err) {
      console.error('Error updating tool:', err);
      toast.error('Failed to update tool');
      return { success: false, error: err.message };
    }
  };

  // Delete tool (admin only)
  const deleteTool = async (toolId) => {
    try {
      const toolRef = doc(db, 'tools', toolId);
      await deleteDoc(toolRef);

      toast.success('Tool deleted successfully');
      return { success: true };
    } catch (err) {
      console.error('Error deleting tool:', err);
      toast.error('Failed to delete tool');
      return { success: false, error: err.message };
    }
  };

  // Increment tool clicks
  const incrementClicks = async (toolId) => {
    try {
      const toolRef = doc(db, 'tools', toolId);
      await updateDoc(toolRef, {
        clicks: increment(1),
      });
    } catch (err) {
      console.error('Error incrementing clicks:', err);
    }
  };

  // Approve tool (admin only)
  const approveTool = async (toolId) => {
    return updateTool(toolId, { status: TOOL_STATUS.APPROVED });
  };

  // Reject tool (admin only)
  const rejectTool = async (toolId) => {
    return updateTool(toolId, { status: TOOL_STATUS.REJECTED });
  };

  // Feature/Unfeature tool (admin only)
  const toggleFeatured = async (toolId, featured) => {
    return updateTool(toolId, { featured });
  };

  // Fetch pending tools (admin only)
  const fetchPendingTools = async () => {
    try {
      const toolsRef = collection(db, 'tools');
      const q = query(toolsRef, where('status', '==', TOOL_STATUS.PENDING), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      }));
    } catch (err) {
      console.error('Error fetching pending tools:', err);
      return [];
    }
  };

  useEffect(() => {
    fetchTools();
  }, []);

  return {
    tools,
    loading,
    error,
    fetchTools,
    fetchToolById,
    submitTool,
    updateTool,
    deleteTool,
    incrementClicks,
    approveTool,
    rejectTool,
    toggleFeatured,
    fetchPendingTools,
  };
};

export default useTools;
