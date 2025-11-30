// Helper functions for PreClass Dashboard

export const getScoreColor = (score) => {
  if (score >= 80) return 'var(--edu-green)';
  if (score >= 60) return 'var(--edu-orange)';
  return 'var(--edu-red)';
};

export const getScoreBg = (score) => {
  if (score >= 80) return 'var(--edu-green-bg)';
  if (score >= 60) return 'var(--edu-orange-bg)';
  return 'var(--edu-red-bg)';
};

export const getStatusInfo = (status) => {
  switch(status) {
    case 'present':
      return { bg: 'var(--edu-green-bg)', color: 'var(--edu-green)', label: 'Đã vào', icon: '✓' };
    case 'late':
      return { bg: 'var(--edu-orange-bg)', color: 'var(--edu-orange)', label: 'Chưa vào', icon: '○' };
    case 'absent-with-reason':
      return { bg: 'var(--edu-blue-bg)', color: 'var(--edu-blue)', label: 'Vắng c/p', icon: '◎' };
    case 'absent-no-reason':
      return { bg: 'var(--edu-red-bg)', color: 'var(--edu-red)', label: 'Vắng k/p', icon: '✗' };
    default:
      return { bg: 'var(--bg-light)', color: 'var(--text-muted)', label: 'Chưa rõ', icon: '?' };
  }
};

export const getReadinessInfo = (status) => {
  switch(status) {
    case 'ready':
      return { bg: 'var(--edu-green-bg)', color: 'var(--edu-green)', label: 'Sẵn sàng', icon: '✓' };
    case 'partial':
      return { bg: 'var(--edu-orange-bg)', color: 'var(--edu-orange)', label: 'Chưa đủ', icon: '◐' };
    case 'not_ready':
      return { bg: 'var(--edu-red-bg)', color: 'var(--edu-red)', label: 'Chưa sẵn sàng', icon: '✗' };
    default:
      return { bg: 'var(--bg-light)', color: 'var(--text-muted)', label: 'Chưa rõ', icon: '?' };
  }
};

export const calculateReadinessStats = (students) => {
  return {
    ready: students.filter(s => s.readinessStatus === 'ready').length,
    partial: students.filter(s => s.readinessStatus === 'partial').length,
    notReady: students.filter(s => s.readinessStatus === 'not_ready').length
  };
};

export const calculateAttendanceStats = (students) => {
  return {
    present: students.filter(s => s.attendanceStatus === 'present').length,
    late: students.filter(s => s.attendanceStatus === 'late').length,
    absentWithReason: students.filter(s => s.attendanceStatus === 'absent-with-reason').length,
    absentNoReason: students.filter(s => s.attendanceStatus === 'absent-no-reason').length
  };
};
