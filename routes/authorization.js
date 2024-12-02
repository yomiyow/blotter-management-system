const accessLevels = {
  'Patrolman/woman': 'Basic Access',
  'Corporal': 'Basic Access',
  'Sergeant': 'Basic Access',
  'Lieutenant': 'Advanced Access',
  'Captain': 'Advanced Access',
  'Major': 'Advanced Access',
  'Colonel': 'Advanced Access',
  'General': 'Full Access'
};

const permissions = {
  'Basic Access': ['View Blotter', 'Download Blotter', 'Export Report'],
  'Advanced Access': ['View Blotter', 'Download Blotter', 'Export Report', 'Edit Blotter'],
  'Full Access': ['View Blotter', 'Download blotter', 'Export Report', 'Edit Blotter', 'Manage users']
};

function checkUserPermission(requiredPermission) {
  return async function (req, res, next) {
    const rank = req.query.rank;

    try {
      const userAccessLevel = accessLevels[rank];
      const userPermissions = permissions[userAccessLevel];

      if (userPermissions.includes(requiredPermission)) {
        next();
      } else {
        res.status(403).json({ message: 'Access Denied: You do not have permission to edit this blotter.' });
        return;
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  };
}

module.exports = checkUserPermission;