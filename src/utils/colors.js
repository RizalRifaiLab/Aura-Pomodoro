// Color presets for different aura themes
export const auraPresets = {
    default: {
        name: 'Purple Dreams',
        focus: {
            colors: ['#8B5CF6', '#6366F1', '#7C3AED', '#5B21B6'],
            gradient: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 50%, #7C3AED 100%)',
        },
        break: {
            colors: ['#10B981', '#14B8A6', '#059669', '#047857'],
            gradient: 'linear-gradient(135deg, #10B981 0%, #14B8A6 50%, #059669 100%)',
        },
    },
    ocean: {
        name: 'Ocean Waves',
        focus: {
            colors: ['#0EA5E9', '#3B82F6', '#0284C7', '#0369A1'],
            gradient: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 50%, #0284C7 100%)',
        },
        break: {
            colors: ['#F97316', '#FB923C', '#EA580C', '#C2410C'],
            gradient: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #EA580C 100%)',
        },
    },
    sunset: {
        name: 'Sunset Bliss',
        focus: {
            colors: ['#EC4899', '#F43F5E', '#DB2777', '#BE185D'],
            gradient: 'linear-gradient(135deg, #EC4899 0%, #F43F5E 50%, #DB2777 100%)',
        },
        break: {
            colors: ['#06B6D4', '#22D3EE', '#0891B2', '#0E7490'],
            gradient: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 50%, #0891B2 100%)',
        },
    },
    forest: {
        name: 'Forest Zen',
        focus: {
            colors: ['#84CC16', '#65A30D', '#4D7C0F', '#3F6212'],
            gradient: 'linear-gradient(135deg, #84CC16 0%, #65A30D 50%, #4D7C0F 100%)',
        },
        break: {
            colors: ['#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9'],
            gradient: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #7C3AED 100%)',
        },
    },
    midnight: {
        name: 'Midnight Blue',
        focus: {
            colors: ['#1E40AF', '#1E3A8A', '#1E293B', '#0F172A'],
            gradient: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 50%, #1E293B 100%)',
        },
        break: {
            colors: ['#FBBF24', '#F59E0B', '#D97706', '#B45309'],
            gradient: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
        },
    },
};

// Get colors for a specific phase and preset
export const getPhaseColors = (preset = 'default', phase = 'focus') => {
    const presetData = auraPresets[preset] || auraPresets.default;
    return presetData[phase] || presetData.focus;
};

// Generate mesh gradient CSS
export const generateMeshGradient = (colors) => {
    if (colors.length < 2) return colors[0] || '#8B5CF6';

    return `
    radial-gradient(at 0% 0%, ${colors[0]} 0px, transparent 50%),
    radial-gradient(at 100% 0%, ${colors[1]} 0px, transparent 50%),
    radial-gradient(at 100% 100%, ${colors[2] || colors[0]} 0px, transparent 50%),
    radial-gradient(at 0% 100%, ${colors[3] || colors[1]} 0px, transparent 50%)
  `;
};

// Get color for specific UI element based on current phase
export const getThemeColor = (preset = 'default', phase = 'focus') => {
    const colors = getPhaseColors(preset, phase);
    return colors.colors[0]; // Primary color
};

export default auraPresets;
