---
path: src/web/App.tsx
---
*** Begin Patch
*** Update File: src/web/App.tsx
@@
-import React, { useState, useEffect, useRef, useCallback } from 'react';
+import React, { useState, useEffect, useRef, useCallback } from 'react';
+import { useTranslation } from 'react-i18next';
+import './i18n';
@@
 function AppContent() {
+  const { t } = useTranslation();
   const [showModal, setShowModal] = useState(false);
@@
-    <div className="text-lg text-gray-600 dark:text-gray-300">Loading...</div>
+            <div className="text-lg text-gray-600 dark:text-gray-300">{t('web.loading')}</div>
@@
-          <button
+          <button
             type="button"
@@
-            Dismiss
+            {t('web.dismiss')}
           </button>
         </div>
       )}
@@
-        <SuccessToast
-          message={`${taskConfirmation.isDraft ? 'Draft' : 'Task'} "${taskConfirmation.task.title}" created successfully! (${taskConfirmation.task.id.replace('task-', '')})`}
+        <SuccessToast
+          message={t('web.task_created', {
+            type: taskConfirmation.isDraft ? t('web.draft') : t('web.task'),
+            title: taskConfirmation.task.title,
+            id: taskConfirmation.task.id.replace('task-', ''),
+          })}
           onDismiss={() => setTaskConfirmation(null)}
           icon={
*** End Patch
